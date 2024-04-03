<template>
  <q-page padding>
    <q-table
      title="Posts"
      :rows="posts"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td
          :props="props"
        >
        <q-btn
          dense
          round
          icon="delete"
          color="negative"
          @click="handleDeletePost(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import postService from 'src/services/posts';

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const posts = ref([]);
    const { list, remove } = postService();
    const columns = [
    {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        format: (val) => `${val}`,
      },
      {
        name: 'title',
        required: true,
        label: 'Title',
        align: 'left',
        field: 'title',
      },
      {
        name: 'content',
        align: 'left',
        label: 'Content',
        field: 'content',
      },
      {
        name: 'author',
        label: 'Author',
        field: 'author',
        align: 'center',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'right',
      },
    ];

    const $q = useQuasar();

      onMounted(() => {
        getPosts();
      });

    const getPosts = async () => {
      try {
        const data = await list();
        console.log(data);
        posts.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
        title: 'Remove post',
        message: 'Would you like to delete this post?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await remove(id);
        $q.notify({message: 'Post deleted successfully', icon: 'check', color: 'positive'});
        await getPosts();
      })
      } catch (error) {
        $q.notify({message: 'An error occurred while deleting the post.', icon: 'warning', color: 'negative'})
      }
    };

    return {
      posts,
      columns,
      handleDeletePost
    };
  },
});
</script>
