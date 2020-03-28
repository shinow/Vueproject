<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="listQuery.pageNum"
    :page-sizes="pageSizes"
    :page-size="listQuery.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>
<script>
/* eslint-disable */
export default {
    props: {
        listQuery: {
            type: Object,
            required: true
        },
        total: {
            required: true
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 50]
        }
    },
    data () {
        return {}
    },
    methods: {
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.$emit('getTableData')
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val
            this.$emit('getTableData')
        },
    }
}
</script>
