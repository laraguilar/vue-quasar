import UseApi from "src/composables/UseApi";

export default function postService() {
    const { list, post, update, remove } = UseApi();

    return {
        list,
        post,
        update,
        remove
    }
}