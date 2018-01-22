<template>
    <div>
         <table class="table">
            <thead>
                <tr>
                    <th v-for="(value, key) in dataset[0]" v-if="filterCols.indexOf(key)> -1">{{key}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataset">
                    <td v-for="(value, key) in item"  v-if="filterCols.indexOf(key) >-1">
                        <span>{{item[key]}}</span>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td :colspan="Cols.length">
                        <ul  class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item" v-for="p in pagecount"><a class="page-link" href="#">{{p}}</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import http from '../../utils/reqAjax.js'
    export default {
        data: function(){
            return {
                dataset: [],
                pagecount: 0,
                page: 1,
                Cols:[]
            }
        },
        props: ['api', 'filterCols','kind','limit'],
        methods:{

            aa:function(kind){
                var url = this.api + '?keyword='+ kind;
                http.get({url: url}).then(res => {
                    // console.log(res.data.data.results)
                    this.dataset = res.data.data.results;
                   
                })
            }
        },
        mounted(){
            console.log(this.filterCols.length)
            this.Cols = this.filterCols ? this.filterCols: [];
            var url = this.api + '?keyword='+ this.kind + '&limit='+this.limit + '&page='+this.page;
            http.get({url: url}).then(res => {
                this.dataset = res.data.data.results;
                var rowscount = res.data.data.results.length;
               
                this.pagecount = Math.ceil(rowscount/this.limit);
               
                })
        }
    }
</script>