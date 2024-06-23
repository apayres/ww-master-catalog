export const Pagination = {
    props: ['pageCount', 'currentPage'],
    methods: {
        clickEvent(num) {
            this.$emit('click-event', num);
        }
    },
    computed: {
        
    },
    template: `
    <div class="row">
        <nav aria-label="Page navigation" v-if="pageCount > 1">
            <ul class="pagination float-end">

                <li class="page-item">
                    <a :class="'page-link' + (Number(this.currentPage) === 1 ? ' disabled' : '')" v-on:click.prevent="clickEvent(Number(this.currentPage) - 1)" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                <li class="page-item" v-for:="num in Number(pageCount)">
                    <a :class="'page-link' + (Number(this.currentPage) === num ? ' active' : '')" v-on:click.prevent="clickEvent(num)" href="#">{{num}}</a>
                </li>
            
                <li class="page-item">
                    <a :class="'page-link' + (Number(this.currentPage) === Number(this.pageCount) ? ' disabled' : '')" v-on:click.prevent="clickEvent(Number(this.currentPage) + 1)" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>

            </ul>
        </nav>
        <div class="clearfix"></div>
    </div>
    `
}