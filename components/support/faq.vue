<template>
  <div>
    <h1
      v-if="back"
      class="text-5xl text-center font-bold mt-8 mb:8 lg:mb-16"
    >
      <nuxt-link
        to="/help-center"
        class="underline"
      >Help </nuxt-link>
      Center
    </h1>
    <h3 class="text-2xl font-bold my-6">{{title}}</h3>
    <div class="faq-block">
      <div class="card-faq faqs">
        <div style="padding-top: 15px;padding-bottom: 15px">
          <div class="faq-row">
            <div
              class="faq-list"
              :class="question.active? 'faq-active':''"
              v-for="(question,i) in questions"
              :key="i"
            >
              <div class="faq-list-item">
                <div
                  style="display: flex;justify-content: space-between;width: 100%;cursor: pointer"
                  @click="activeInactiveFaq(i)"
                >
                  <div
                    :class="question.active? 'faq-heading-active':''"
                    style="max-width: 90%;text-align: justify-all"
                  >{{question.question}}</div>
                  <div
                    v-if="question.active"
                    class="faq-icon"
                  ><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAABYUFBZUVFYUFBYUVFYUVFYUFBZT09AQECAgIBYUFBYUFBVVVVYUFBZT09ZUFBYUVFYUFAAAADX687fAAAAEXRSTlMAYF+Di4WipwQCoIAD8U1tbr++4GkAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4wwbDSMbIvjTzQAAAE1JREFUGNNjYCAbMDKh8pkFBVnQ+CgirIKCbGyCgqxI8uwcnFxwNWA+AwNcBMqHi3AD9fNAlPIAzeFm4IXzwSK8DHz8PAjreAT4yPAUAJCkA0piuKtzAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTI3VDEzOjM1OjI2KzAwOjAwkv9asAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0yN1QxMzozNToyNiswMDowMOOi4gwAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"></div>
                  <div
                    v-else
                    class="faq-icon"
                  ><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAABZT09ZUFBVVVVYUVFYUFBYUFBYUFBYUFBYUFBAQEBZUVFZT09YUVFYUVFYUFBYUFBYUFAAAADze8F2AAAAEXRSTlMATW0DbvGigIKoBKGKi4WGYFPOOTsAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4wwbDSMwjkQqjQAAAFNJREFUGNOdj8sWgCAIRMdI7WU5//+zYYewlsXKe5VBgO8VBukgY0BkciOJEZlulJmBiZyXi1dyawczzmYalzts1xztP/o4ffO4N1Pe/6v1x1JWJ7ZJAzqimiZMAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTI3VDEzOjM1OjQ4KzAwOjAwBK8oagAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0yN1QxMzozNTo0OCswMDowMHXykNYAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"></div>
                </div>
                <p
                  v-show="question.active"
                  v-html="question.answer"
                  style="text-align: justify-all;cursor: initial"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      <div class="card-faq contact-button">-->
      <!--        <div style="padding-bottom: 10px">Issue still not resolved?</div>-->
      <!--        <div>-->
      <!--          <button class="faq-button">CONTACT US</button>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    questions: {
      type: Array,
      default: function() {
        return [];
      }
    },
    back: { type: Boolean, default: false },
    title: { type: String, default: "" }
  },
  methods: {
    activeInactiveFaq(i) {
      this.questions.forEach((val, index) => {
        if (index === i) {
          val.active = !val.active;
        } else {
          val.active = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.faq-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
.faq-active:hover {
  background-color: initial !important;
}
.contact-button {
  width: 27% !important;
  height: 125px;
  padding: 24px;
  font-size: 18px;
  font-weight: bold;
  font-family: Helvetica;
}
.faqs {
  width: 100% !important;
}
.card-faq {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.faq-list {
  padding: 0 30px 0 30px;
}
.faq-list:hover {
  transition: 0.3s;
  background-color: #f7f8fa;
}
.faq-list:last-child > .faq-list-item {
  border-bottom: initial !important;
}
.faq-list-item {
  color: #454242;
  font-size: medium;
  font-weight: 100;
  padding: 22px 0 22px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  font-family: Helvetica;
  /*justify-content: space-between;*/
}
.faq-heading-active {
  font-weight: bold;
  font-size: 16px;
}
.faq-button {
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  background-color: #ed8538;
  color: #fff;
  padding: 10px 12px;
  border-radius: 2px;
  letter-spacing: 0.4px;
  border: 0;
}
.faq-down-icon {
  cursor: pointer;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAABZT09ZUFBVVVVYUVFYUFBYUFBYUFBYUFBYUFBAQEBZUVFZT09YUVFYUVFYUFBYUFBYUFAAAADze8F2AAAAEXRSTlMATW0DbvGigIKoBKGKi4WGYFPOOTsAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4wwbDSMwjkQqjQAAAFNJREFUGNOdj8sWgCAIRMdI7WU5//+zYYewlsXKe5VBgO8VBukgY0BkciOJEZlulJmBiZyXi1dyawczzmYalzts1xztP/o4ffO4N1Pe/6v1x1JWJ7ZJAzqimiZMAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTI3VDEzOjM1OjQ4KzAwOjAwBK8oagAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0yN1QxMzozNTo0OCswMDowMHXykNYAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC);
}
.faq-icon {
  cursor: pointer;
  /*background-repeat: no-repeat;*/
  height: 16px;
  width: 16px;
  /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAABYUFBZUVFYUFBYUVFYUVFYUFBZT09AQECAgIBYUFBYUFBVVVVYUFBZT09ZUFBYUVFYUFAAAADX687fAAAAEXRSTlMAYF+Di4WipwQCoIAD8U1tbr++4GkAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4wwbDSMbIvjTzQAAAE1JREFUGNNjYCAbMDKh8pkFBVnQ+CgirIKCbGyCgqxI8uwcnFxwNWA+AwNcBMqHi3AD9fNAlPIAzeFm4IXzwSK8DHz8PAjreAT4yPAUAJCkA0piuKtzAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTI3VDEzOjM1OjI2KzAwOjAwkv9asAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0yN1QxMzozNToyNiswMDowMOOi4gwAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC);*/
}
@media only screen and (max-width: 600px) {
  .faq-block {
    flex-direction: column;
  }
  .contact-button {
    width: 100% !important;
    margin-top: 20px;
  }
  .faqs {
    width: 100% !important;
  }
}

@media only screen and (min-width: 600px) {
  .faq-block {
    flex-direction: column;
  }
  .contact-button {
    width: 100% !important;
    margin-top: 20px;
  }
  .faqs {
    width: 100% !important;
  }
}

@media only screen and (min-width: 768px) {
  .faq-block {
    flex-direction: column;
  }
  .contact-button {
    width: 100% !important;
    margin-top: 20px;
  }
  .faqs {
    width: 100% !important;
  }
}

@media only screen and (min-width: 992px) {
  .faq-block {
    flex-direction: row;
  }
  .contact-button {
    width: 27% !important;
    margin-top: 0 !important;
  }
  .faqs {
    width: 100% !important;
  }
}

@media only screen and (min-width: 1200px) {
  .contact-button {
    width: 27% !important;
    margin-top: 0 !important;
  }
}
</style>
