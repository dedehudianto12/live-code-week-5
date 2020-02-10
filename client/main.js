
$(document).ready(function () {
    console.log('okk')
    checkLogin()
})

const BASE_URL = `http://localhost:3000`

function checkLogin() {
    if (localStorage.getItem('access_token')) {
        home()
        getComic()
    } else {
        login()
    }
}

function login() {
    $('#login-register').show()
    $('#comic').hide()
    $('#login').show()
    $('#register').hide()
    $('#update').hide()
    $('#navbar').hide()
}

function register() {
    $('#login').hide()
    $('#register').show()
    $('#update').hide()
    $('#navbar').hide()
}

function home() {
    $('#navbar').show()
    $('#login-register').hide()
    $('#comic').show()
    $('#update').hide()
}

$('#login-form').on('click', function (event) {
    event.preventDefault()
    const email = $('#email_login').val()
    const password = $('#password_login').val()
    loginController(email, password)
})

$('#register-form').on('click', function (event) {
    event.preventDefault()
    const name = $('#name_register').val()
    const email = $('#email_register').val()
    const password = $('#password_register').val()
    registerController(name, email, password)
})

$('#random-register').on('click', function (event) {
    event.preventDefault()
    $.ajax({
        methods: 'get',
        url: 'https://randomuser.me/api/',
        dataType: 'json'
    })
        .then(data => {
            let fakeUser = data.results[0]
            let name = fakeUser.name.first + ' ' + fakeUser.name.last
            $('#name_register').val(name)
            $('#email_register').val(fakeUser.email)
            $('#password_register').val(fakeUser.login.password)
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`

            })
        })
})

function registerController(name, email, password) {
    $.ajax({
        method: 'post',
        url: `${BASE_URL}/register`,
        data: {
            name,
            email,
            password
        }
    })
        .then(data => {
            localStorage.setItem('access_token', data.access_token)
            $('#name_register').empty()
            $('#email_register').empty()
            $('#password_register').empty()
            checkLogin()
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`

            })
        })
}


function logOut() {
    localStorage.clear()
    checkLogin()
}


function loginController(email, password) {
    $.ajax({
        method: 'post',
        url: `${BASE_URL}/login`,
        data: {
            email,
            password
        }
    })
        .then(data => {
            localStorage.setItem('access_token', data.access_token)
            checkLogin()

        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`

            })
        })
}


function getComic() {
    $('#content').empty()
    $.ajax({
        method: 'get',
        url: `${BASE_URL}/comics`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .then(data => {
            data.forEach(element => {
                $('#content').append(`
                <div class="col-4 mb-4" id="content">
                <div class="card text-center">
                  <img
                    src="${element.imageUrl}"
                    class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.author}</p>
                    <button onclick="findComic('${element.id}')" class="btn btn-primary">Edit</button>
                  </div>
                </div>
              </div>
                `)
            });
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`

            })
        })
}

let comicId = ''

function findComic(id) {
    comicId = id
    $('#update').slideDown()
    $.ajax({
        method: 'get',
        url: `${BASE_URL}/comics/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .then(data => {
            $('#title_update').val(data.title)
            $('#author_update').val(data.author)
            $('#image_update').val(data.imageUrl)
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`
            })
        })
}


$('#btn-update').on('click', function (event) {
    event.preventDefault()
    const title = $('#title_update').val()
    const author = $('#author_update').val()
    const image = $('#image_update').val()
    updateComic(comicId, title, author, image)
})

function updateComic(id, title, author, image) {
    $.ajax({
        method: 'put',
        url: `${BASE_URL}/comics/${id}`,
        data: {
            title,
            author,
            image
        },
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .then(data => {
            getComic()
            $('#update').slideUp()
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`

            })
        })
}