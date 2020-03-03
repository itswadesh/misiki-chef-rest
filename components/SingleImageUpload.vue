<template>
  <div class="mt-4 bg-gray-100 mx-auto relative">
    <div v-if="$apollo.loading">Loading...</div>
    <div
      v-if="image"
      v-lazy:background-image="`${image}`"
      class="bg-cover bg-no-repeat h-64 relative"
    >
      <button
        type="button"
        @click="removeImage(image)"
        class="absolute right-0 top-0 w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-200"
      >
        <i class="fa fa-close" />
      </button>
    </div>
    <form
      enctype="multipart/form-data"
      novalidate
      v-else
    >
      <div class="dropbox">
        <input
          type="file"
          name="photos"
          :disabled="isSaving"
          @change="uploadPhoto"
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag image here to upload
          <br />or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">{{ fileCount }} files uploaded successfully...</p>
        <p v-if="isFailed">
          Upload failed. Please
          <a @click="currentStatus=0">try again</a>
        </p>
      </div>
    </form>
    <!-- <div>
      <h2 v-if="data">Good: {{data.goodField}}</h2>
      <pre v-if="error">Bad: 
        {{error}}
        <span v-for="(e,ix) in error" :key="ix">{{e.message}}</span>
      </pre>
    </div> -->
  </div>
</template>

<script>
import singleUpload from "~/gql/product/singleUpload.gql";
import deleteFile from "~/gql/product/deleteFile.gql";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  // name required for removing
  props: {
    image: { required: true, default: "" },
    name: { type: String, required: true },
    folder: { type: String, required: true },
    crunch: { type: Boolean, default: false }
  },
  data() {
    return {
      currentStatus: 0,
      data: null,
      error: null
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
    // img: {
    //   get: function() {
    //     return this.image;
    //   },
    //   set: function(value) {
    //     // this.$emit("selected", value);
    //   }
    // }
  },
  methods: {
    async uploadPhoto({ target }) {
      try {
        this.image = (
          await this.$apollo.mutate({
            mutation: singleUpload,
            variables: { file: target.files[0], folder: this.folder },
            fetchPolicy: "no-cache"
          })
        ).data.singleUpload.filename;
        this.$emit("save", this.name, this.image);
      } catch (e) {
        console.log("err... ", e);
        this.error = e.graphQLErrors;
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`;
    },
    save(imagePath) {
      this.image = imagePath;
      this.$emit("save", this.name, imagePath);
    },
    removeImage(image) {
      let vm = this;
      this.$swal({
        title: "Delete image?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          vm.deleteConfirmed(image);
        }
      });
    },
    async deleteConfirmed(image) {
      this.image = "";
      await this.$apollo.mutate({
        mutation: deleteFile,
        variables: { path: image },
        fetchPolicy: "no-cache"
      });
      this.$emit("remove", this.name);
    },
    filesChange(fieldName, fileList, name) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      // this.save(formData, name);
      // This formdata will be sent to server
      this.saveImage(formData, name);
    },

    async saveImage(formData, name) {
      try {
        this.currentStatus = 1;
        let x = await this.$apollo.mutate({
          mutation: singleUpload,
          variables: { file: formData },
          fetchPolicy: "no-cache"
        });
        const path = x[0]; // Where the variable is assigned
        this.currentStatus = 2;
        this.save(path); // Save the image against api
      } catch (e) {
        this.currentStatus = 3;

        this.err(e);
      }
    },
    err(e) {
      this.$store.commit("setErr", e.response.data);
    }
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
  /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>