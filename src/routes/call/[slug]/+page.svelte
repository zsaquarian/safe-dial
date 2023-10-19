<script lang="ts">
  import { onMount } from 'svelte';
  import { Call, Device } from '@twilio/voice-sdk';
  import PhoneIcon from '~icons/mdi/phone-outgoing-outline';
  import MutedIcon from '~icons/mdi/microphone-off';
  import UnmutedIcon from '~icons/mdi/microphone';
  import HangupIcon from '~icons/mdi/phone-hangup';
  import type { PageData } from '../../$types';

  let device: Device;
  let call: Call;
  export let data: PageData;
  let inProgress = false;
  let muted = false;

  const setupClient = async () => {
    const token = await (await fetch('/api/token')).json();
    device = new Device(token.token, {
      logLevel: 1,
      codecPreferences: ['opus', 'pcmu']
    });
    device.register();

    device.on('registered', () => {
      console.log('Device ready');
    });

    device.on('error', (err) => {
      console.log(err.message);
    });
  };

  onMount(setupClient);

  const makeCall = async () => {
    call = await device.connect({ params: { username: data.username } });
    inProgress = true;
    call.on('accept', () => {
      console.log('accepted');
    });
    call.on('disconnect', () => {
      inProgress = false;
      console.log('disconnect');
    });
    call.on('cancel', () => {
      console.log('cancel');
    });
  };
  $: call?.mute(muted);
</script>

<svelte:head>
  <title>Talk to {data.username}</title>
</svelte:head>
<h1 class="text-5xl text-center">Talk to {data.username}</h1>
{#if inProgress}
  <div class="flex gap-4">
    <button
      class={`text-2xl mx-auto ${
        muted ? 'bg-gray-500' : 'bg-gray-300'
      } p-3 rounded-md text-white flex gap-2`}
      on:click={() => (muted = !muted)}
    >
      {#if muted}
        <MutedIcon />
      {:else}
        <UnmutedIcon />
      {/if}
    </button>
    <button
      class="text-2xl mx-auto bg-red-500 p-3 rounded-md text-white flex gap-2"
      on:click={() => call.disconnect()}><HangupIcon />Hang up</button
    >
  </div>
{:else}
  <button
    class="text-2xl mx-auto bg-green-500 p-3 rounded-md text-white flex gap-2"
    on:click={makeCall}><PhoneIcon />Call</button
  >
{/if}
