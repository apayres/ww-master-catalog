using Dommel;
using MasterCatalog.Dal.Configuration;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System.Linq.Expressions;


namespace MasterCatalog.Dal.Repositories
{
    internal abstract class BaseRepository <T> where T : class
    {
        private readonly string _connectionString;

        protected BaseRepository(IOptions<DalOptions> options)
        {
            _connectionString = options.Value.ConnectionString;
            Dapper.SqlMapper.Settings.CommandTimeout = options.Value.CommandTimeout;
        }

        protected int Insert(T entity)
        {
            using(SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var id = connection.Insert<T>(entity);
                return Convert.ToInt32(id);
            }
        }

        protected bool Update(T entity)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Update<T>(entity);
            }
        }

        protected bool Delete(T entity)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Delete<T>(entity);
            }
        }

        protected int DeleteMany(Expression<Func<T, bool>> predicate)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.DeleteMultiple<T>(predicate);
            }
        }

        protected T? Get(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Get<T>(id);
            }
        }

        protected List<T> GetAll()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.GetAll<T>().ToList();
            }
        }

        protected List<T> GetAll(Expression<Func<T, bool>> predicate)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Select<T>(predicate).ToList();
            }
        }

    }
}
