<script lang="ts">
  import { onMount } from 'svelte';

  let users;
  onMount(async () => {
    users = await (await fetch('/api/getUsers')).json();
  });
</script>

<svelte:head>
  <title>Safe Dial</title>
</svelte:head>

<h1 class="text-center text-5xl">Who would you like to contact?</h1>
{#if users}
  <ul class="list-disc list-inside m-2">
    {#each users as user}
      <li><a class="text-blue-500 text-2xl" href={`/call/${user}`}>{user}</a></li>
    {/each}
  </ul>
{/if}
<a
  class="text-2xl block bg-green-500 p-3 rounded-md text-white w-36 text-center mx-auto"
  href="/createUser">Create new user</a
>
