<script>
  const url = "http://localhost:3000";

  let input = "";
  let output = "";
  let loading = false;
  let copied = false;

  let usage = parseInt(localStorage.getItem("usage")) || 0;

  const maxInputLimit = 500;
  const outputLimit = 1500;

  const reset = parseInt(localStorage.getItem("reset"));
  const time = new Date().getTime();

  if (!reset || time - reset > 24 * 60 * 60 * 1000) {
    localStorage.setItem("usage", "0");
    localStorage.setItem("reset", time.toString());
    usage = 0;
  }

  $: inputLimit = Math.min(maxInputLimit, outputLimit - usage);
  $: inputReached = input.length >= inputLimit;
  $: outputReached =
    usage === outputLimit || usage + input.length >= outputLimit;

  let audio; // This will store the decoded audio buffer

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64); // Decode base64 to binary string

    const length = binaryString.length;
    const bytes = new Uint8Array(length); // Create a Uint8Array to hold the byte values

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i); // Convert binary string to byte values
    }

    return bytes.buffer; // Return as an ArrayBuffer
  };

  const handleClick = async () => {
    // Show loading
    loading = true;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((x) => x.json())
      .finally(() => (loading = false));

    output = response.output;

    const audioBuffer = base64ToArrayBuffer(response.audio);
    const blob = new Blob([audioBuffer], { type: "audio/mp3" }); // Set the MIME type as per the file (e.g., 'audio/wav')
    const objectUrl = URL.createObjectURL(blob);
    audio = new Audio(objectUrl);

    usage = usage + input.length;
    localStorage.setItem("usage", usage.toString());
  };

  // Function to handle the base64 string, convert to ArrayBuffer, and play
  const handleAudio = async () => {
    audio.play(); // Play the audio
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).catch((err) => {
      console.error("Error:", err);
    });
    copied = true;

    setTimeout(() => (copied = false), 5000);
  };
</script>

<main>
  <div id="header">
    <h1>Pret</h1>
    <h2>"Explain this in layman's terms."</h2>
  </div>
  <div>
    <textarea
      id="in"
      placeholder="Input"
      bind:value={input}
      maxlength={inputLimit}
    ></textarea>
    <p class={"limit " + (inputReached ? "reached" : "")}>
      {input.length} / {inputLimit}
    </p>
  </div>
  <div>
    <button
      class="interpret"
      disabled={outputReached || !input || input.trim().length === 0}
      on:click={handleClick}>Interpret</button
    >
  </div>
  <div id="output">
    <textarea id="out" placeholder="Output" bind:value={output} readonly
    ></textarea>
    <p class={"limit " + (outputReached ? "reached" : "")}>
      {usage} / {outputLimit} ({usage + input.length})
    </p>
    {#if audio}
      <button on:click={handleAudio} id="play-icon">
        <img src="/play.svg" alt="Play Icon" />
      </button>
    {/if}
    <button on:click={handleCopy} id="copy-icon" title="Copy to Clipboard">
      <img src="/copy.svg" alt="Copy Icon" />
    </button>
    <object
      class={loading ? "active" : "inactive"}
      id="loading-icon"
      data="/loading.svg"
      title="Loading..."
    ></object>
  </div>
  <div class="copied" class:copied-show={copied}>
    <p>Copied to Clipboard</p>
  </div>
</main>

<style>
  main {
    position: relative;
    background-color: var(--four);
    color: var(--minus-four);

    width: 500px;
    height: 500px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    text-align: center;
  }

  main > * {
    padding: 5px;
  }

  h2 {
    color: var(--seven);
    font-style: italic;
  }

  textarea {
    resize: none;

    background-color: var(--six);
    color: var(--minus-six);

    border: 0px;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    width: 300px;
    height: 100px;

    scrollbar-width: thin;
  }

  textarea:focus {
    outline: 2px solid white;
  }

  .interpret {
    background-color: var(--minus-four);
    color: var(--four);

    border: 0px;
    border-radius: 10px;
    padding: 0.5rem 1rem;

    transition:
      transform 0.15s ease-in,
      background-color 0.15s ease-in;
  }

  .interpret:hover:enabled {
    cursor: pointer;
    background-color: var(--minus-six);
    transform: scale(1.1);
  }

  .interpret:active:enabled {
    background-color: white;
  }

  .interpret:disabled {
    background-color: var(--six);
  }

  #output {
    position: relative;
  }

  #loading-icon {
    position: absolute;
    width: 50px;

    top: calc(50% - 25px);
    right: calc(50% - 25px);

    animation-name: rotate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  #copy-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition:
      background-color 0.05s ease-in,
      transform 0.05s ease-in;
  }

  #copy-icon img {
    width: 20px;
    height: 20px;
  }

  #copy-icon:hover {
    background-color: #7f7f7fbf;
    transform: scale(1.1);
  }

  #copy-icon:active {
    background-color: #ffffffbf;
  }

  #play-icon {
    position: absolute;
    bottom: 0px;
    right: calc(50% - 30px);
    width: 60px;
    height: 60px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #play-icon img {
    width: 40px;
    height: 40px;

    border-radius: 80px;
    padding: 5px;

    background-color: var(--four);

    transition:
      background-color 0.05s ease-in,
      transform 0.05s ease-in;
  }

  #play-icon:hover img {
    background-color: var(--seven);
    transform: scale(1.1);
  }

  #play-icon:active img {
    background-color: white;
  }

  #out {
    cursor: default;
  }

  .limit {
    margin-top: 5px;
    text-align: left;

    transition: color 0.25s;
  }

  .reached {
    color: red;
    font-weight: 700;
  }

  .copied {
    position: absolute;

    /* visibility: hidden; Initially hidden */
    opacity: 0; /* Initially invisible */
    bottom: 20px;

    border-radius: 5px;

    width: 200px;
    height: 50px;

    background-color: #00ff003f;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.1s ease-out,
      bottom 0.1s ease-out;

    cursor: default;
    user-select: none;
    pointer-events: none;
  }

  .copied-show {
    /* visibility: visible; */
    opacity: 1; /* Fades in when visible */
    bottom: 30px;
  }

  .active {
    visibility: visible;
  }

  .inactive {
    visibility: hidden;
  }
</style>
