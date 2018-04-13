<style lang="scss">
  @import '~@/styles/mixins', '~@/styles/variables';
  .ask-tinymce-box {
    width: 100%;
    .mce-statusbar {
      display: none;
    }
    .mce-panel {
      border-color: map-get($color, 100D1);
    }
    div.mce-edit-area {
      border: none;
    }
  }

</style>
<template>
  <div class="ask-tinymce-box">
    <textarea :id="tinymceId"></textarea>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce';

  import 'tinymce/themes/modern/theme';

  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/imagetools';
  import 'tinymce/skins/lightgray/skin.min.css';
  import './zh_CN.js';
  export default {
    name: "test",
    data() {
      return {
        editor: null,
        isChange: false,
        tinymceId: 'ask-tinymce-' + +new Date()
      }
    },
    props: {
      value: "",
      url: {
        type: String,
        'default': ''
      },
      params: {
        type: Object,
        'default': null
      }
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    watch: {
      value () {
        if (this.editor && !this.isChange) {
          this.$nextTick(()=>{
            this.editor.setContent(this.value);
          })
        }
      }
    },
    mounted() {
      let { params, url } = this;
      let setting = {
        selector: `#${this.tinymceId}`,
        plugins: ['paste', 'link', 'image', 'imagetools'],
        language: "zh_CN",
        file_browser_callback_types: 'image',
        height: 500,
        setup: (editor) => {
          this.editor = editor;
          editor.on('init', () => {
            editor.setContent(this.value);
            // 注册事件
            editor.on('input change undo redo', () => {
              // 获得编辑结果
              this.isChange = true;
              this.model = editor.getContent();
            });
          });
        },
        images_upload_handler: function(blobInfo, success, failure) {
          let option = {};

          option = new FormData();
          option.append('file', blobInfo.blob(), blobInfo.filename());

          // option.file = blobInfo.base64();
          // console.log(blobInfo);

          // 添加其他参数
          if (typeof params == 'object' && params) {
            console.log(params.token )
            option.append('token',params.token || '')
          }

          console.log(option.get('token'));
          new Promise(function(resolve, reject) {
            let client = new XMLHttpRequest();
            client.open('POST', url, true);
            console.log(url);
            client.withCredentials = false;
            client.onreadystatechange = function() {
              if (this.readyState !== 4) {
                return;
              }
              if (this.status === 200 || this.status === 201) {
                resolve(JSON.parse(this.responseText));
              } else {
                reject(this.status);
              }
            };

            // client.setRequestHeader('Content-Type', 'multipart/form-data;');
            // 设置header
            if (typeof headers == 'object' && headers) {
              Object.keys(headers).forEach((k) => {
                client.setRequestHeader(k, headers[k]);
              })

            }
            client.send(option || null);
          }).then(
            // 上传成功
            function(resData) {
              if (resData.code == 200) {
                success(resData.data.url);
              } else {
                failure(resData.message || '上传失败');
              }

            },
            // 上传失败
            function(sts) {
              failure(sts.message || '上传失败');
            }
          );
        },
        file_picker_callback: function(callback, value, meta) {
          // Provide file and text for the link dialog

          if (meta.filetype == 'file') {
            callback('mypage.html', { text: 'My text' });
          }

          // Provide image and alt text for the image dialog
          if (meta.filetype == 'image') {
            callback('myimage.jpg', { alt: 'My alt text' });
          }

          // Provide alternative source and posted for the media dialog
          if (meta.filetype == 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
          }
        }
      };
      tinymce.init(setting);

    },
  }

</script>
