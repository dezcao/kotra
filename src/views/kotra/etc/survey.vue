<template>
  <div class="components-container">
    <el-card class="box-card">
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
           <el-col :span="5">
             <el-form-item label="사업유형">
                <el-select v-model="form.region" placeholder="please select your zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
           <el-col :span="14">
             <el-form-item label="단일사업">
               <el-select v-model="form.region" placeholder="please select your zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="5">
             <el-form-item label="주선유형">
                <el-select v-model="form.region" placeholder="please select your zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
           <el-col :span="5">
             <el-form-item label="무역관">
                <el-select v-model="form.region" placeholder="please select your zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
           <el-col :span="14" style="padding-left: 120px;">
            <el-select v-model="form.region" placeholder="Select">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
            <span style="padding:3px;"></span>
            <el-input placeholder="검색어를 입력하세요" v-model="form.desc" style="width: 260px;"></el-input>
            <span style="padding:3px;"></span>
            <el-button icon="el-icon-search" @click="onSubmit">검색</el-button>
           </el-col>
         </el-row>
      </el-form>
    </el-card>

    <el-row style="margin-top: 10px;">
      <el-col :span="21">Total 1,020</el-col>
      <el-col :span="3" >
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%; margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="rownum" label="No." width="50"></el-table-column>
      <el-table-column property="name" label="사업명" show-overflow-tooltip></el-table-column>
      <el-table-column property="date" label="사업기간" width="180"></el-table-column>
      <el-table-column property="admin" label="주관부서" width="120"></el-table-column>
      <el-table-column property="exec_nm" label="수행부서" width="120"></el-table-column>
      <el-table-column property="status_nm" label="바이어명" width="180"></el-table-column>
      <el-table-column property="status" label="신청상태">
        <template slot-scope="scope">
          <el-button>신청</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top: 10px;">
      <el-col :span="17">
        <el-button icon="el-icon-download">다운로드</el-button>
      </el-col>
      <el-col :span="7" >
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EtcSurvey",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      tableData: [
        {
          rownum: 2, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "2021 상시 온라인 상담회", // 사업명,
          date: "2016-05-03 ~ 2021.12.31", // 사업기간
          type_nm: "수출상담회", // 사업유형
          admin: "바이코리아팀", // 주관부서
          exec_nm: "상하이무역관", // 수행부서
          company_cnt: "12/13", // 상담결과,
          status_nm: "CAYO CO.LTD", // 진행상태
          status: "Y", // 상담주선 설정
        },
        {
          rownum: 1, // sql pagenation 으로부터 받기를 원함.
          code: 3000002, // 사업코드
          name: "2021 상반기 전시회", // 사업명,
          date: "2016-05-03 ~ 2021.12.31", // 사업기간
          type_nm: "수출상담회", // 사업유형
          admin: "바이코리아팀", // 주관부서
          exec_nm: "키토무역관", // 수행부서
          company_cnt: "12/13", // 상담결과,
          status_nm: "SISTA", // 진행상태
          status: "Y", // 상담주선 설정
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>