<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`api/test`);
    const { items } = await res.json();

    return { items };
  }
</script>

<script>
  import AuthWrapper from "../components/wrapper/AuthWrapper.svelte";
  import request from "../services/fetch";
  import { isAuthenticated } from "../stores/auth";

  const handleClick = async () => {
    try {
      const res = await request("/api/test", {
        method: "post"
      });
      // const data = await res.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<AuthWrapper permission="authenticated">
  <button>POST</button>
</AuthWrapper>
