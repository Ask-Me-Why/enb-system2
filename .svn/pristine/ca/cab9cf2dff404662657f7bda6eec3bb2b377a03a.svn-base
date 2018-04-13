<style lang="scss" scoped>
	@import '~@/styles/mixins', '~@/styles/variables';
.match-root{
  width: 100%;
  .content{
    font-family: Arial, Helvetica, sans-serif;
    background-color: map-get($color , 100 );
    width: 100%;
    height: 8rem;
    margin-top: .25rem;
    font-size: .18rem;
    text-align: center;
  }
  .tb{
    width: 100%;
    border-collapse: collapse;
  }
  .thead{
    width: 100%;
    background-color: map-get($table ,grayThBg );
  }
  .inner{
    width: 96%;
    height: .5rem;
    margin: auto;
    padding-top: .3rem;
  }
  .thead th{
    padding: .07rem 0;
    width: 33%;
  }
  .tbody td{
    padding: .15rem 0;
    width: 33%;
  }
  .one{
    width: 100%;
    border-bottom: 1px solid map-get($table, grayThBg);
  }
  .a1{
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: -66;
    opacity: 0;
  }
  .putOne{
    width: 48%;
  }
  .h{
    display: none;
  }
}

</style>

<template>
  <div class="match-root">
     <el-date-picker
      ref="input1"
      :class="{a1:hide1}"
      @change='getsTime'
      v-model="value5"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    <enb-tab>功能权限</enb-tab>
     <div class="content">
       <div class="inner">
         <table class="tb">
           <thead class="thead">
             <tr>
               <th>功能</th>
               <th>操作</th>
               <th>开/关</th>
             </tr>
           </thead>
           <tbody class="tbody">
             <tr class="one">
               <td>{{ pos }}</td>
               <td>无</td>
                <td>
                <el-switch
                v-model="value1"
                @change='changeStatus'
                >
              </el-switch> <span>{{ open }}</span>
               </td>
             </tr> 
             <tr class="one">
               <td>{{ save }}</td>
               <td>
                  <el-select 
                  size="medium"
                   @change='lit(value)'
                   v-model="value"
                   class="putOne" >
                    <el-option
                    v-for="item in options"
                    :label='item.label'
                    :key="item.value"
                    :value="item.value">
                    </el-option>
                  </el-select>
               </td>
               <td>
                 <el-switch
                v-model="value2"
                @change='otherStatus'
                >
              </el-switch> <span>{{ close }}</span>
              </td>
             </tr>
           </tbody>
         </table>
        </div>
          
         <div class="h"> {{ open_id }}  </div>
         <div class="h"> {{ close_id }} </div>
          <div class="h"> {{ h }} </div>
     </div>    
  </div>
</template>

<script>
  import elementComponents from '@/utils';
  import { askDialogConfirm,askDialogToast,merge } from '@/utils';
  import { RootApi } from '@/services';
  import { mapGetters } from 'vuex';
  import moment from 'moment';

export default {
  name: 'MatchRoot',
  data() {
    return {
      rootApi: new RootApi(),
      ss: true,
      c: '',
      hide1: true,
      value1: true,
      value2: false,
      open: '',
      close: '',
      pos: '',
      save: '',
      value4: '',
      value5: '',
      h: '',
      value: '定时关闭',
      open_id: '',
      close_id:'',
      options: [{
          value: '选项1',
          label: "定时开启"},
          {
          value: '选项2',
          label: '定时关闭',
        }],
      switchData: [{
        fontData: '开关'
      }],
    }
  },
  computed:{
    matchId(){
      return this.$route.params.matchId;
    }
  },
  methods: {
    getsTime(val) {
      var z = moment(val).format('YYYY-MM-DD HH:mm:ss');
      this.value = z;
      var t = moment(val).unix() ;
    
     if( this.value2 == false ) {
        this.rootApi.saveTimeOpen({
        id:  this.close_id,
        timer_open: t,
      });        
        this.rootApi.getRoot({
          competition_id: this.$route.params.matchId
       }).then((res) =>{
         console.log(res.data.data)
       }).catch((err)=>
       console.log(err))

     }
    }
    ,
    lit(value,label) {
     if( value === '选项1') {
        this.$refs.input1.focus();
    }

    if( value === '选项2') {
        this.rootApi.saveTimeClose({
        id:  this.close_id,
      })
       this.rootApi.getRoot({
          competition_id: this.$route.params.matchId
       })
     
    }
   },
   changeStatus(type){
     let _status = 0;
     if(this.value1 == true) {
       this.open = '开'
     }else{
       this.open = '关'
     }
     if(type == 1){
       _status = 1
     }
     if(type == 0){
       _status =  0
     }
     
     if(type == 1 ) {
       this.rootApi.getOpen(
         this.open_id
       )
     }else{
       this.rootApi.getClose(
         this.open_id
       )
     }

     let { matchId } = this;
      this.rootApi.getRoot({
      competition_id: matchId,
      status: _status,
      type:type
    })
   },
   otherStatus(type) {
      let _status = 0;
      if(type == 1) {
        _status = 1
      }
      if(type == 0) {
        _status = 0
      }

     if(this.value2 == true) {
       this.close = '开';
       this.value = '定时关闭';
     }else{
       this.close = '关';
     }
     
     if( type == 1 ) {
       this.rootApi.getOpen(
        this.close_id
       )
     }else{
       this.rootApi.getClose(
        this.close_id
       )
     }
    
     let { matchId } = this;
      this.rootApi.getRoot({
      competition_id: matchId,
      status: _status,
      type:type
    })
   }
   },
  mounted() {
    this.rootApi.getRoot({
      competition_id: this.$route.params.matchId
    })
    .then((res) => {
      var data = res.data.data;
      this.pos = data[0].name;
      this.save = data[1].name;
      this.open_id = data[0].id;
      this.close_id = data[1].id;  
   
      if(data[0].status == 1) {
        this.value1 = true;
        this.open = '开';
      }else{
        this.value1 = false;
        this.open = '关';  
      }
  
      if( this.value2 == false ) {
        this.options.pop();
        this.value = '定时开启';
      }

      if(data[1].status == 1) {
        this.value2 = true ;
        this.close = '开';
        this.value = '定时关闭'
     
      }else{
        this.value2 = false;
        this.close = '关';
      }
      if(data[1].timer_open == 0 && this.value2 == false) {
        this.value = '定时开启'
      }
      if( this.value2 == false && data[1].timer_open != 0 ) {
         this.value = moment.unix(data[1].timer_open).format('YYYY-MM-DD HH:mm:ss');
      }
       console.log(data);
      
    })
    .catch(function(err){
      console.log(err);
    });
  } 
}
</script>
