<template>
	<div class="components-container">
		<el-card class="box-card">
      <el-form ref="form" :model="form" label-width="120px">
         <el-row>
           <el-col :span="5">
             <el-form-item label="유형">
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
            <el-button icon="el-icon-search" @click="openDialog" type="primary">대행사 등록</el-button>
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
      <el-table-column property="c1" label="유형"></el-table-column>
      <el-table-column property="c2" label="대행사명" ></el-table-column>
      <el-table-column property="c3" label="담당자" ></el-table-column>
      <el-table-column property="c4" label="대표전화" ></el-table-column>
      <el-table-column property="c5" label="홈페이지" ></el-table-column>
      <el-table-column property="c6" label="등록자" ></el-table-column>
      <el-table-column property="c7" label="등록일" ></el-table-column>
      <el-table-column label="설정" >
        <template slot-scope="scope">
          <el-button @click="updateFn(scope.row)" type="primary">등록</el-button>
        </template>
      </el-table-column>
      <el-table-column label="설정" >
        <template slot-scope="scope">
          <el-button type="primary">보기</el-button>
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
      title="대행사 등록"
      :visible.sync="dialog1"
      width="40%">
      <el-form>
        <el-form-item label-width="180px" label="대행사명">
          <el-input v-model="form.v1"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="대행사 유형">
          <el-radio v-model="form.v2" label="1">통역업체</el-radio>
          <el-radio v-model="form.v2" label="2">호텔</el-radio>
          <el-radio v-model="form.v2" label="3">여행사</el-radio>
          <el-radio v-model="form.v2" label="4">행사 대행사</el-radio>
        </el-form-item>
        <el-form-item label-width="180px" label="대표전화">
          <el-input v-model="form.v3"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="팩스 번호">
          <el-input v-model="form.v4"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="홈페이지">
          <el-input v-model="form.v5"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="담당자명"><el-input v-model="form.v6"></el-input></el-form-item>
        <el-form-item label-width="180px" label="담당자 연락처"><el-input v-model="form.v7"></el-input></el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">취소</el-button>
        <el-button type="primary" @click="dialog1 = false">저장</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="사용자 등록"
      :visible.sync="dialog2"
      width="40%">
      <el-form>
        <el-form-item label-width="180px" label="대행사명">
          {{selected.c2}}
        </el-form-item>
        <el-form-item label-width="180px" label="사용자명">
          <el-input v-model="form.v3"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="이메일">
          <el-input v-model="form.v3"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="아이디">
          <el-input v-model="form.v4"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="비밀번호">
          <el-input v-model="form.v5"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="비밀번호 확인">
          <el-input v-model="form.v5"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="전화번호">
          <el-input v-model="form.v5"></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="담당 언어">
          <el-select v-model="form.region" placeholder="please select your language">
            <el-option label="EN" value="EN"></el-option>
            <el-option label="KR" value="KR"></el-option>
          </el-select>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">취소</el-button>
        <el-button type="primary" @click="dialog1 = false">저장</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>

export default {
	name: 'EtcCompany',
	data() {
		return {
      dialog1: false,
      dialog2: false,
      selected: {},
			form: {
        v1: '',
        v2: '1',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
        v7: '',
        name: '',
        region: 'EN',
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
          c1: '통역업체',
          c2: '시아이티스',
          c3: '배혜선',
          c4: '02-2621-2000',
          c5: 'www.c-itis.com',
          c6: '123456',
          c7: '2021-09-07',
        },
        {
          rownum: 2, // sql pagenation 으로부터 받기를 원함.
          c1: '행사대행',
          c2: 'E&C 커뮤니케이션',
          c3: '조성일',
          c4: '02-585-1234',
          c5: 'www.jenc.co.kr',
          c6: '123456',
          c7: '2021-09-07',
        },
        {
          rownum: 1, // sql pagenation 으로부터 받기를 원함.
          c1: '여행사',
          c2: '세방여행',
          c3: '김민주',
          c4: '02-204-1111',
          c5: 'www.globaltour.co.kr',
          c6: '123456',
          c7: '2021-09-07',
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
    openDialog() {
      this.dialog1 = true;
    },
    updateFn(item) {
      this.selected = item;
      this.dialog2 = true;
    }
	}
}
</script>
