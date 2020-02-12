<template>
  <div class="px-2 lg:px-64 bg-gray-100">
    <faq-blocks />
    <faq
      title="Frequently Asked Questions"
      :questions="questions"
    />
  </div>
</template>

<script>
const faq = () => import("~/components/support/faq");
const faqBlocks = () => import("~/components/support/faqBlocks");

export default {
  components: {
    faq,
    faqBlocks
  },
  layout: "support",
  data() {
    return {
      questions: [
        {
          question: "How can I keep track of the status of my orders?",
          answer:
            "The ‘My Account’ section in your litekart App will help review the status of your orders, so that you can receive relevant information based on the respective ‘Order Number’.",
          active: false
        },
        {
          question:
            "Will I get a confirmation call from Litekart after placing order? ",
          answer:
            "No we dont call customers for order confirmation. All new customers are logged in to litekart app via OTP(one time password) so we take this as order confirmation and ship you the order right away.",
          active: false
        },
        {
          question: "How can I cancel my order?",
          answer:
            "In order to cancel your order, please login to litekart app in your my account section. Open the order you want to cancel and you will see an option to cancel the order. Your order can only be cancelled before it reaches the ‘Dispatched’ status in your my account on Litekart app.",
          active: false
        },
        {
          question: "What is the procedure for Returns or Exchange?",
          answer:
            "You can return your product easily through litekart app in few seconds. Just follow these steps:<br>" +
            "<ul style='margin-left: 40px'><li>You can Sign in to your Litekart Account From  <a href='https://demo.litekart.com/account/login' style='color: #9b000a'>Here</a>.</li><li>Go to my order section.</li><li>Click on the View order for the specific order you want to place replacement/refund Request</li><li>Select refund/replace option from the top and then click one or all items that you want return or replaced.</li><li>Select the quantities and reason for replacement/refund</li><li>Click on the SAVE button to submit the request</li></ul>",
          active: false
        },
        {
          question: "I wish to become a seller on Litekart",
          answer:
            "<a href='/apply-for-vendor' style='color: #9b000a'>Fill this form</a> and  our team will reach you as soon as possible. ",
          active: false
        },
        {
          question: "I can’t sign in to my account.",
          answer:
            "Go to <a href='/account/forgot-password?email=' style='color: #9b000a'>Reset password page</a>. Fill in your registered phone or email id and tap Rest Password. An otp will be sent to your medium either phone or email. Enter the otp and set a new password.",
          active: false
        },
        {
          question: "What are the delivery charges?",
          answer:
            "Delivery charge is the fee that has to be paid for the on-time delivery of a purchased product. Our standard shipping charges are Rs 150 but it keeps on changing based on the number of products purchased. For the best understanding please see the total shipping fee added to your order at checkout page.",
          active: false
        }
      ]
    };
  },
  mounted() {
    this.scrollTo();
  },
  methods: {
    scrollTo() {
      window.scroll({
        behavior: "smooth",
        left: 0,
        top: 0
      });
    }
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;
    return {
      title: "Help & Support"
    };
  }
};
</script>

<style scoped>
.container {
  width: 70%;
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 600px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 768px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 992px) {
  .container {
    width: 80%;
  }
}

@media only screen and (min-width: 1200px) {
  .container {
    width: 70%;
  }
}
</style>
