<template>
  <div class="components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="구분">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="19">
            <el-form-item label="상품품목군">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
              <span style="padding:3px;"></span>
              <el-input placeholder="검색어를 입력하세요" v-model="form.desc" style="width: 260px;"></el-input>
              <span style="padding:3px;"></span>
              <el-button icon="el-icon-search" @click="onSubmit">검색</el-button>
              <span style="padding:3px;"></span>
              <el-button icon="el-icon-search" @click="onSubmit">엑셀 다운로드</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="12">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%; margin-top: 10px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="rownum" label="No." width="50"></el-table-column>
          <el-table-column property="name" label="기업명" show-overflow-tooltip></el-table-column>
          <el-table-column property="date" label="상품품목군"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <div ref="raddar" :class="className" :style="{height:height,width:width}"/>
      </el-col>
    </el-row>
  </div>

  
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data() {
    return {
      chart: null,
      form: {
        region: ''
      },
      tableData: [
        {
          rownum: 10, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 9, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 8, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 7, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 6, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 5, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 4, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 3, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
        {
          rownum: 2, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "디아이엔", // 사업명,
          date: "소비재", // 사업기간
        },
      ],
      multipleSelection: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    initChart() {
      this.chart = echarts.init(this.$refs.raddar, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: 'Sales', max: 10000 },
            { name: 'Administration', max: 20000 },
            { name: 'Information Technology', max: 20000 },
            { name: 'Customer Support', max: 20000 },
            { name: 'Development', max: 20000 },
            { name: 'Marketing', max: 20000 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: 'Allocated Budget'
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: 'Expected Spending'
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: 'Actual Spending'
            }
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
