<template>
    <div class="container">
        <div class="row">

            <div class="col-md-8 col-md-offset-2">

                <h1>Post Job</h1>

                <form action="" method="POST">

                    <div class="form-group has-error">
                        <label for="Name">Name <span class="require"></span></label>
                        <input type="text" class="form-control" name="Name" required />

                    </div>
                    <div class="form-group">
                        <label for="type">Job type </label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="type">Education </label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="title">rate price <span class="require"></span></label>
                        <input type="number" class="form-control" name="title" />
                    </div>
                    <div class="form-group">
                        <label for="title">welfare benefit and description <span class="require"></span></label>
                        <textarea rows="3" class="form-control" name="description"></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">
                            Create
                        </button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>