<template>
	<div class="components-container">
		<el-card class="box-card">
      <el-form ref="form" :model="form" label-width="120px">
         <el-row>
           <el-col :span="5">
             <el-form-item label="소속">
                <el-select v-model="form.region" placeholder="please select your zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
           <el-col :span="5">
             <el-form-item label="권한">
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
            <el-button icon="el-icon-search" @click="openPermission" type="primary">권한등록</el-button>
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
      <el-table-column property="c1" label="소속"></el-table-column>
      <el-table-column property="c2" label="부서코드" ></el-table-column>
      <el-table-column property="c3" label="부서명" ></el-table-column>
      <el-table-column property="c4" label="사용자명" ></el-table-column>
      <el-table-column property="c5" label="아이디" ></el-table-column>
      <el-table-column property="c6" label="권한" ></el-table-column>
      <el-table-column property="c7" label="등록자" ></el-table-column>
      <el-table-column property="c8" label="등록일" ></el-table-column>
      <el-table-column property="c9" label="설정" >
        <template slot-scope="scope">
          <el-button @click="updateFn(scope.row)" :type="scope.row.c9 == 1 ? 'primary':'success'">{{scope.row.c9 == 1 ? '수정':'등록'}}</el-button>
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

    <el-dialog
      title="사용자 권한 설정"
      :visible.sync="dialogPermission"
      width="30%">
      <el-form>
        <el-form-item label-width="180px" label="사용자명">김민영</el-form-item>
        <el-form-item label-width="180px" label="부서명">바이코리아팀</el-form-item>
        <el-form-item label-width="180px" label="권한 부여">
          <el-radio v-model="type" label="1">단일사업 담당자</el-radio>
          <el-radio v-model="type" label="2">상담주선 담당자</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPermission = false">취소</el-button>
        <el-button type="primary" @click="dialogPermission = false">저장</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>

export default {
	name: 'EtcUser',
	data() {
		return {
      type: '1',
      dialogPermission: false,
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
          c1: 'KOTRA',
          c2: '6190',
          c3: '바이코리아팀',
          c4: '정순이',
          c5: '186456',
          c6: '상담주선 담당자',
          c7: '123456',
          c8: '2021-09-07',
          c9: '1'
        },
        {
          rownum: 2, // sql pagenation 으로부터 받기를 원함.
          c1: 'KOTRA',
          c2: '6190',
          c3: '바이코리아팀',
          c4: '정순이',
          c5: '186456',
          c6: '상담주선 담당자',
          c7: '123456',
          c8: '2021-09-07',
          c9: '1'
        },
        {
          rownum: 1, // sql pagenation 으로부터 받기를 원함.
          c1: 'KOTRA',
          c2: '6190',
          c3: '바이코리아팀',
          c4: '정순이',
          c5: '186456',
          c6: '상담주선 담당자',
          c7: '123456',
          c8: '2021-09-07',
          c9: '2'
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
    openPermission() {
      this.dialogPermission = true;
    },
    updateFn(item) {
      //
    }
	}
}
</script>
