<template>
  <div class="app-container">
    <!-- {{ $route.params }} -->
    <h4>사업별 상담 설정</h4>
    <div style="margin-top:10px;"> </div>
    <el-card class="box-card">
      <el-form ref="consultForm" :model="consultForm" :rules="rules" class="form-container">
        <el-row>
          <div>
            <h4>기본 정보</h4>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="통합사업명">수출상담회</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="상담 주선 사용 여부">
                  <el-radio v-model="consultForm.status" label="1">사용</el-radio>
                  <el-radio v-model="consultForm.status" label="2">미사용</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="상담 유형">
                  <el-radio v-model="consultForm.type" label="1">온라인</el-radio>
                  <el-radio v-model="consultForm.type" label="2">오프라인</el-radio>
                  <el-radio v-model="consultForm.type" label="3">온/오프라인</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="상담 신청 승인 여부">
                  <el-radio v-model="consultForm.enable" label="1">사용</el-radio>
                  <el-radio v-model="consultForm.enable" label="2">미사용</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="담당자설정">
                  <div class="block">
                  <el-button type="primary" @click="setAdminUser">설정</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row>
          <div>
            <h4>상담 일정</h4>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="상담 주선 기간">
                  <el-date-picker
                    v-model="consultForm.consult_date"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="시간 설정 기준시">
                  <el-select v-model="consultForm.time_line" placeholder="Select">
                    <el-option
                      v-for="item in time_lines"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="상담 가능 시간">
                  <div v-for="(item, index) in consultForm.consult_times" :key="index">
                    <div style="margin-top:3px;" v-show="index > 0"></div>
                    <el-time-select
                      placeholder="Start time"
                      v-model="item.startTime"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '20:30'
                      }">
                    </el-time-select>
                    ~
                    <el-time-select
                      placeholder="Start time"
                      v-model="item.endTime"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '20:30'
                      }">
                    </el-time-select>
                    <span style="margin-left: 10px;"></span>
                    <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="addConsultTime(index)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="removeConsultTime(index)" v-show="index > 0"></el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row>
          <div>
            <h4>상담 주선</h4>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="최대 신청 건수">
                  국내기업 <el-input v-model="consultForm.com_cnt" style="width: 100px;" type="number" min="0"></el-input> 건
                  <span style="margin-right:50px;"></span>
                  바이어 <el-input v-model="consultForm.buyer_cnt" style="width: 100px;" type="number" min="0"></el-input> 건
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="자동주선 우선순위">
                  <el-drag-select v-model="consultForm.auto" style="width:400px; margin-top:10px;" multiple placeholder="">
                    <el-option v-for="item in autos" :key="item.value" :label="item.label" :value="item.value" />
                  </el-drag-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row>
          <div>
            <h4>알림 정보</h4>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="이메일 알림 여부">
                  <el-radio v-model="consultForm.email_push" label="1">전송</el-radio>
                  <el-radio v-model="consultForm.email_push" label="2">미전송</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="대표 이메일" prop="email">
                  <el-input v-model="consultForm.email" style="width:400px;" type="email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="SMS 알림 여부">
                  <el-radio v-model="consultForm.sms_push" label="1">전송</el-radio>
                  <el-radio v-model="consultForm.sms_push" label="2">미전송</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="대표 전화번호">
                  <el-input v-model="consultForm.phone" style="width:400px;"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row>
          <div>
            <h4>대행사 정보</h4>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="대행사 이용 여부">
                  <el-radio v-model="consultForm.com_use" label="1">사용</el-radio>
                  <el-radio v-model="consultForm.com_use" label="2">미사용</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label-width="180px" label="대행사 설정">
                  <el-button type="primary">설정</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="16">
          <el-button>취소</el-button>
          <el-button type="primary" @click="submitForm">저장</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="담당자 설정"
      :visible.sync="dialogAdminUser"
      width="70%">
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="180px" label="권한 선택">
              <el-radio v-model="adminUserForm.auth" label="1">단일사업</el-radio>
              <el-radio v-model="adminUserForm.auth" label="2">상담주선</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="180px" label="담당자 추가">
              <el-select
                v-model="adminUserForm.admins"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="Please enter a keyword"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in selected_admins"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span style="margin-right:3px;"></span>
              <el-button type="primary">담당자 추가</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="180px" label="단일사업 선택">
              <el-checkbox-group v-model="adminUserForm.types">
                <el-checkbox label="1">FTA 활용관 (수출상담회)</el-checkbox>
                <el-checkbox label="2">FTA 활용관 (수입상담회)</el-checkbox>
                <el-checkbox label="3">프로젝트 협력관 (IT상담회)</el-checkbox>
                <el-checkbox label="4">프로젝트 협력관 (환경-신재생에너지)</el-checkbox>
                <el-checkbox label="5">프로젝트 협력관 (건설플랜트)</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="Date"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          property="name"
          label="Name"
          width="120">
        </el-table-column>
        <el-table-column
          property="address"
          label="Address"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px;"></div>
      <el-row>
        <el-col>
          <el-button >재설정</el-button>
          <el-button type="primary" >삭제</el-button>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdminUser = false">취소</el-button>
        <el-button type="primary" @click="dialogAdminUser = false">저장</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { validEmail } from '@/utils/validate'
import { fetchArticle } from '@/api/article'

const defaultForm = {
  status: '1',
  type: '1',
  enable: '2',
  consult_date: '',
  time_line: 'KST',
  consult_times: [
    {
      startTime: '09:30',
      endTime: '10:30'
    }
  ],
  com_cnt: 0,
  buyer_cnt: 0,
  auto: [],
  email_push: '1',
  email: '',
  sms_push: '',
  phone: '',
  com_use: '1'
}
export default {
  name: "BizConsultingSetup",
  components: { ElDragSelect },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '필수입니다.',
          type: 'error'
        })
        callback(new Error(rule.field + '입력되지 않음.'))
      } else {
        callback()
      }
    }
    const validateSourceEmail = (rule, value, callback) => {
      if (value) {
        if (validEmail(value)) {
          callback()
        } else {
          this.$message({
            message: '이메일 형식이 아닙니다.',
            type: 'error'
          })
          callback(new Error('이메일 형식 오류.'))
        }
      } else {
        callback()
      }
    }
    return {
      consultForm: Object.assign({}, defaultForm),
      rules: {
        email: [
            { validator: validateRequire },
            { validator: validateSourceEmail, trigger: 'blur' }
          ],
      },
      time_lines: [{
          value: 'KST',
          label: 'KST'
        }, {
          value: 'UTC',
          label: 'UTC'
        }],
      autos: [{
          value: '1',
          label: '상호신청'
        }, {
          value: '2',
          label: '우선신청'
        }, {
          value: '3',
          label: '우수기업'
        }],

      // 담당자설정 다이얼로그
      dialogAdminUser: false,
      adminUserForm: {
        auth: '1',
        admins: [], // value
        types: ['1']
      },

      //
      selected_admins: [], // options
      admin_list: [], // list : 사본
      loading: false,
      all_admins: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
      // 개복잡하다..

      tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }],
        multipleSelection: []
    }
  },
  mounted() {
    this.admin_list = this.all_admins.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  computed: {
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        // return (+new Date(this.consultForm.display_time))
      },
      set(val) {
        // this.consultForm.display_time = new Date(val)
      }
    }
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.consultForm = response.data

        // just for test
        this.consultForm.title += `   Article Id:${this.consultForm.id}`
        this.consultForm.content_short += `   Article Id:${this.consultForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      console.log(this.consultForm)
      this.$refs.consultForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '성공',
            message: '변경성공',
            type: 'success',
            duration: 2000
          })
          
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addConsultTime(index) {
      /* 배열 임의의 위치에 요소 추가 제거 */
      // start - 수정할 배열 요소의 인덱스
      // deleteCount - 삭제할 요소 개수, 제거하지 않을 경우 0
      // el - 배열에 추가될 요소
      this.consultForm.consult_times.splice(index+1, 0, {
        startTime: '09:30',
        endTime: '10:30'
      });

    },
    removeConsultTime(index) {
      // 상담시간 삭제
      this.consultForm.consult_times.splice(index, 1);
    },

    setAdminUser() {
      // 상담자 설정 다이얼로그 열기
      this.dialogAdminUser = true;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.selected_admins = this.admin_list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.selected_admins = [];
        }
      }
  },
};
</script>