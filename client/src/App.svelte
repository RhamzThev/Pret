<script>
  const url = "http://localhost:3000";

  let input = "";
  let output = "";
  let loading = false;
  let copied = false;

  const handleClick = async () => {
    // Show loading
    loading = true;

    console.log(input);
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
    <textarea id="in" placeholder="Input" bind:value={input}></textarea>
  </div>
  <div>
    <button
      disabled={!input || input.trim().length === 0}
      on:click={handleClick}>Interpret</button
    >
  </div>
  <div id="output">
    <textarea id="out" placeholder="Output" bind:value={output} readonly
    ></textarea>
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

  button {
    background-color: var(--minus-four);
    color: var(--four);

    border: 0px;
    border-radius: 10px;
    padding: 0.5rem 1rem;

    transition:
      transform 0.15s ease-in,
      background-color 0.15s ease-in;
  }

  button:hover:enabled {
    cursor: pointer;
    background-color: var(--minus-six);
    transform: scale(1.1);
  }

  button:disabled {
    background-color: var(--six);
  }

  button:active {
    background-color: white;
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
      background-color 0.15s ease-in,
      transform 0.15s ease-in;
  }

  #copy-icon img {
    width: 20px;
    height: 20px;
  }

  #copy-icon:hover {
    background-color: #7f7f7fbf;
  }

  #copy-icon:active {
    background-color: #ffffffbf;
  }

  #out {
    cursor: default;
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
