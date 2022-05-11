class Comment {
    constructor(filmId, name, job, text, grade) {
        this.id = Math.random().toString(16).slice(2);
        this.filmId = filmId;
        this.name = name;
        this.job = job;
        this.text = text;
        this.grade = grade;
    }
}

class CommentMethods {

    getCommentList() {
        let commentListJson = localStorage.getItem("commentList");
        if (commentListJson !== null) {
            return JSON.parse(commentListJson);
        }
        return [];
    }

    getCommentToFilmList(filmId) {
        let commentList = this.getCommentList();
        return commentList.filter(n => n.filmId === filmId);
    }

    addCommentToFilm(filmId) {
        let commentList = this.getCommentList();
        let form = document.forms.newcomment_form;
        let comment = new Comment(
            filmId,
            form.userName.value,
            form.userJob.value,
            form.userText.value,
            form.userGrade.value
        );
        if (comment.name !== '' && comment.job !== "" && comment.text !== "") {
            commentList.push(comment);
            localStorage.setItem("commentList", JSON.stringify(commentList));
        }
        document.getElementById('newcomment').innerHTML = ``;
    }

    closeCommentList() {
        document.getElementById('comment').innerHTML = ``;
    }

    renderCommentList(filmId, name) {
        let htmlComment = '';
        const commentList = this.getCommentToFilmList(filmId);
        if (commentList.length > 0) {
            commentList.forEach(({name, job, text, grade}) => {
                htmlComment += `
                <div class="comment-element">
                    <div class="comment__name">(${grade}) ${name}, ${job}</div>
                    <div class="comment__text">${text}</div>
                </div>
            `;
            });
            document.getElementById('comment').innerHTML = `
            <div id="comment_container" class="comment">
                <span class="comment__title">Комментарии к фильму ${name}</span>
                <div>
                    ${htmlComment}
                </div>
                <button class="comment__btn" onclick="commentMethods.closeCommentList()">Закрыть</button>
            </div>
        `;
        } else {
            document.getElementById('comment').innerHTML = `
            <div id="comment_container" class="comment">
                <span class="comment__title">Комментарии к фильму ${name}</span>
                <div>
                    <div class="comment-element">
                        <div class="comment__name">Комментарии отсутствуют</div>
                    </div>
                </div>
                <button class="comment__btn" onclick="commentMethods.closeCommentList()">Закрыть</button>
            </div>
        `;
        }
    }

    renderAddComment(filmId) {
        document.getElementById('newcomment').innerHTML = `
            <div id="newcomment_container" class="comment">
                <span class="comment__title">Новый комментарий</span>
                <form id="newcomment_form">
                    <input type="text" id="userName" placeholder="Имя" required>
                    <div class="split"></div>
                    <input type="text" id="userJob" placeholder="Род деятельности" required>
                    <div class="split"></div>
                    <input type="text" id="userText" placeholder="Текст комментария" required>
                    <div class="split"></div>
                    <select id="userGrade">
                        <option value="1">Ужасно</option>
                        <option value="2">Плохо</option>
                        <option value="3">Нормально</option>
                        <option value="4">Хорошо</option>
                        <option value="5">Отлично</option>
                    </select>
                </form>
                <button class="comment__btn" onclick="commentMethods.addCommentToFilm('${filmId}')">Сохранить</button>
            </div>
            `;
    }


    deleteFromCommentList(id) {
        let commentList = this.getcommentList();
        const index = commentList.findIndex(n => n.id === id);
        commentList.splice(index, 1);
        localStorage.setItem('offlinecommentList', JSON.stringify(commentList));
    }

}

const commentMethods = new CommentMethods();

/*
id
filmId
name
job
text
grade
 */