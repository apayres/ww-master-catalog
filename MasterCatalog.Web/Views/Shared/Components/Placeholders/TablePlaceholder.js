export default {
    props: ['show', 'columns', 'rows'],
    template: `
        <div v-if="show" class="container placeholder-glow pt-2 pb-2">
            <div class="row ps-2 pe-2" v-for="r in Number(rows)">
                <div class="col p-1" v-for="c in Number(columns)">
                    <span class="placeholder p-3 w-100"></span>
                </div>
            </div>
        </div>
    `
}
