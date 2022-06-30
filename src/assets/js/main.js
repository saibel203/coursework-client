'use strict';

window.onload = function () {

    if (!localStorage.getItem('token')) {
        let container = document.querySelector(".modal-container"),
            pwShowHide = document.querySelectorAll(".showHidePw"),
            pwFields = document.querySelectorAll(".password"),
            signUp = document.querySelector(".signup-link"),
            login = document.querySelector(".login-link");

        pwShowHide.forEach(eyeIcon => {
            eyeIcon.addEventListener("click", () => {
                pwFields.forEach((pwField) => {
                    if (pwField.type === "password") {
                        pwField.type = "text";

                        pwShowHide.forEach(icon => {
                            icon.classList.replace("uil-eye-slash", "uil-eye");
                        })
                    } else {
                        pwField.type = "password";

                        pwShowHide.forEach(icon => {
                            icon.classList.replace("uil-eye", "uil-eye-slash");
                        })
                    }
                })
            })
        })

        signUp?.addEventListener("click", () => {
            container?.classList.add("active");
        });
        login?.addEventListener("click", () => {
            container?.classList.remove("active");
        });

        const linkShow = document.getElementById('login-register-button'),
            overlay = document.getElementById('overlay'),
            modal = document.getElementsByClassName('modal-container'),
            closeBtn = document.getElementsByClassName('close');

        linkShow.onclick = () => {
            overlay.classList.add('visible');
            modal[0].classList.add('visible');
            document.body.style.overflow = 'hidden';
        };

        overlay.onclick = () => {
            overlay.classList.remove('visible');
            modal[0].classList.remove('visible');
            document.body.style.overflow = 'visible';
        };

        closeBtn[0].onclick = () => {
            overlay.classList.remove('visible');
            modal[0].classList.remove('visible');
            document.body.style.overflow = 'visible';
        };
    }
};
