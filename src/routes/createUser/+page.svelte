<script lang="ts">
  import CreateIcon from '~icons/mdi/account-plus-outline';
</script>

<svelte:head>
  <title>Create User</title>
</svelte:head>
<h1 class="text-5xl text-center mb-4">Create User</h1>
<form method="post" action="/api/createUser" class="flex flex-col gap-2 w-1/2 mx-auto">
  <input name="username" class="p-2 border-black border-2 rounded-md" placeholder="Username" />
  <input
    name="number"
    class="p-2 border-black border-2 rounded-md"
    placeholder="Number (including country code)"
  />
  <button class="text-2xl mx-auto bg-green-500 p-3 rounded-md text-white flex gap-2" type="submit"
    ><CreateIcon />Create</button
  >
</form>
