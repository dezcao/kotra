<template>
	<div class="components-container">
		<el-card class="box-card">
      <el-form ref="form" :model="form" label-width="120px">
         <el-row>
           <el-col :span="5">
             <el-form-item label="사용여부">
                <el-select v-model="form.region" placeholder="please select your zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
           <el-col :span="19" style="padding-left: 120px;">
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
      <el-table-column property="code" label="코드유형"></el-table-column>
      <el-table-column property="name" label="사용코드" ></el-table-column>
      <el-table-column property="date" label="코드명(영문)" ></el-table-column>
      <el-table-column property="type_nm" label="사용여부" ></el-table-column>
      <el-table-column property="admin" label="등록자" ></el-table-column>
      <el-table-column property="exec_nm" label="등록일" ></el-table-column>
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
	name: 'EtcCode',
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
          rownum: 3, // sql pagenation 으로부터 받기를 원함.
          code: "CMN", // 사업코드
          name: "ALL", // 사업명,
          date: "전체(All)", // 사업기간
          type_nm: "Y", // 사업유형
          admin: "123456", // 주관부서
          exec_nm: "2021-09-07", // 수행부서
        },
        {
          rownum: 2, // sql pagenation 으로부터 받기를 원함.
          code: "CMN", // 사업코드
          name: "ALL", // 사업명,
          date: "전체(All)", // 사업기간
          type_nm: "Y", // 사업유형
          admin: "123456", // 주관부서
          exec_nm: "2021-09-07", // 수행부서
        },
        {
          rownum: 1, // sql pagenation 으로부터 받기를 원함.
          code: "CMN", // 사업코드
          name: "ALL", // 사업명,
          date: "전체(All)", // 사업기간
          type_nm: "Y", // 사업유형
          admin: "123456", // 주관부서
          exec_nm: "2021-09-07", // 수행부서
        },
      ],
      multipleSelection: [],
		}
	},
	methods: {
		onSubmit() {
      console.log('submit!');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
	}
}
</script>
