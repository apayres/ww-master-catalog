﻿using MasterCatalog.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MasterCatalog.Web.Controllers
{
    public class AccountController : Controller
    {

        private readonly IApplicationUserService _service;

        public AccountController(IApplicationUserService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                return RedirectToAction("List", "Items");
            }

            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(string userName, string password)
        {
            try
            {
                var applicationUser = _service.GetApplicationUser(userName, password);
                if (applicationUser == null)
                {
                    ViewBag.Error = "Sorry, those credentitals aren't valid.";
                    return View();
                }

                HttpContext.Session.Set("AUTH_USER", JsonSerializer.SerializeToUtf8Bytes(applicationUser, applicationUser.GetType()));
            }
            catch (Exception ex)
            {
                ViewBag.Error = "Looks like we can't reach the server right now...";
                return View();
            }

            return RedirectToAction("List", "Items");
        }

        public IActionResult Index()
        {
            var user = HttpContext.User;
            return View();
        }
                
        [AllowAnonymous]
        public IActionResult LogOut()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }

    }
}