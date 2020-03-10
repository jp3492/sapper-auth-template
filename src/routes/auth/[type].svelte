<script context="module">
  import { getForm } from "./_form";

  export async function preload({ params }) {
    const form = getForm(params.type);
    return {
      type: params.type,
      ...form
    };
  }
</script>

<script>
  import auth_methods from "../../services/auth";

  import { validation } from "./_form";
  import { authError } from "../../stores/auth";

  export let type;
  export let values;
  export let touched;
  export let errors;

  $: isValid =
    Object.keys(errors).every(e => errors[e] === "") &&
    Object.keys(touched).every(t => touched[t]);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    if (type === "checkbox") {
      values[name] = checked;
    } else {
      values[name] = value;
    }

    if (!touched[name]) {
      touched[name] = true;
    }

    validateForm();
  };

  // add submit flag to check for non touched to be not affected by validation
  const validateForm = () => {
    const fields = document.forms["auth_form"].getElementsByTagName("input");
    for (let { name, type, value, checked } of fields) {
      if (type !== "checkbox" && values[name] !== value) {
        values[name] = value;
      }
      validation[name](type === "checkbox" ? checked : value, errors, values);
    }
  };

  const handleSubmit = e => {
    validateForm();
    auth_methods[type](values);
  };
</script>

<style>
  form,
  div {
    max-width: 400px;
    width: 100%;
    place-self: center;
  }
  div {
    display: grid;
    place-items: center;
    padding: 10px;
    gap: 5px;
  }
</style>

<!-- type: ["register", "confirm", "login", "request_reset", "reset"] -->
<form name="auth_form" on:submit|preventDefault={handleSubmit}>
  {#if ['register', 'login', 'confirm', 'request_reset'].includes(type)}
    <label class:invalid={errors.email !== ''}>
      Email:
      <input
        type="email"
        name="email"
        value={values.email}
        on:keyup={handleChange}
        placeholder="Email" />
      <p>{errors.email}</p>
    </label>
  {/if}
  {#if ['confirm', 'reset'].includes(type)}
    <label class:invalid={errors.code !== ''}>
      Confirmation code:
      <input
        name="code"
        type="text"
        value={values.code}
        on:keyup={handleChange}
        placeholder="Code" />
      <p>{errors.code}</p>
    </label>
  {/if}
  {#if ['register', 'login', 'reset'].includes(type)}
    <label class:invalid={errors.password !== ''}>
      Password:
      <input
        name="password"
        type="password"
        value={values.password}
        on:keyup={handleChange} />
      <p>{errors.password}</p>
    </label>
  {/if}
  {#if ['register', 'reset'].includes(type)}
    <label class:invalid={errors.password_confirm !== ''}>
      Confirm Password:
      <input
        name="password_confirm"
        type="password"
        value={values.password_confirm}
        on:keyup={handleChange} />
      <p>{errors.password_confirm}</p>
    </label>
  {/if}
  {#if type === 'register'}
    <label class:invalid={errors.tac !== ''} class="label-checkbox">
      <input name="tac" type="checkbox" on:change={handleChange} />
      Hereby i agree to the terms and conditions.
      <p>{errors.tac}</p>
    </label>
  {/if}
  <button type="submit">Submit</button>
</form>
{#if $authError !== ''}
  <p>{$authError}</p>
{/if}
<div>
  <a href="/auth/login">Login here</a>
  <a href="/auth/register">Sign up here</a>
  <a href="/auth/request_reset">Forgot password?</a>
</div>
