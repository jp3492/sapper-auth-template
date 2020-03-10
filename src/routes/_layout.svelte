<script>
  import Nav from "../components/Nav.svelte";
  import AuthObserver from "../components/observer/AuthObserver.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<AuthObserver {segment} />
<Nav {segment} />

<main>
  <slot />
</main>
