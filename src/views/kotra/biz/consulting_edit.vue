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
                  <el-button type="primary">설정</el-button>
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
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { validURL, validEmail } from '@/utils/validate'
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

      
    }
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
      this.consultForm.consult_times.splice(index, 1);
    }
  },
};
</script>