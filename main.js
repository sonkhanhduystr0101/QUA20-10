// Tạo tự động icon bay & bong bóng mờ
const cuteIcons = ['🧸', '🌸', '💖', '🌺', '🎀', '✨', '🌷', '💐', '🎁', '🎈', '💌'];

function createFallingElements() {
    setInterval(() => {
        const element = document.createElement('div');
        element.classList.add('falling-element');
        element.innerText = cuteIcons[Math.floor(Math.random() * cuteIcons.length)];
        element.style.left = Math.random() * 95 + 'vw';
        element.style.animationDuration = (Math.random() * 3 + 5) + 's';
        element.style.fontSize = (Math.random() * 12 + 22) + 'px';
        document.body.appendChild(element);

        setTimeout(() => { element.remove(); }, 7500);
    }, 280);
}

function createBubbles() {
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 35 + 15 + 'px';
        bubble.style.width = size;
        bubble.style.height = size;
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDuration = (Math.random() * 4 + 6) + 's';
        bubble.style.animationDelay = Math.random() * 4 + 's';
        document.body.appendChild(bubble);
    }
}

// Gọi tạo hiệu ứng khi tải xong trang
document.addEventListener('DOMContentLoaded', () => {
    createFallingElements();
    createBubbles();

    const inputField = document.getElementById('userNameInput');
    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkNameAndOpen();
            }
        });
    }
});

// Dữ liệu lá thư chúc mừng 20/10
const messagesData = {
    "mai": `Chào Phạm Thị Ngọc Mai,

Dạo này việc học đại học sao rồi Mai, lịch học với thi cử bớt dồn dập chưa? Bữa giờ lu bu quá tính ra tụi mình từ hồi tốt nghiệp cấp ba tới giờ cũng lâu lắm rồi chưa có dịp ngồi lại mần ly cà phê tám chuyện.

Nhân ngày 20/10, Sơn Khánh Duy chúc Mai lúc nào cũng tươi tắn, học hành qua môn dễ dàng, điểm số cao chót vót và săn được nhiều học bổng nha. Dù đứa nào cũng bận rộn với môi trường mới nhưng Duy lúc nào cũng nhớ tới tình bạn thời cấp ba của tụi mình. Hôm nào rảnh rỗi thu xếp được thì nhắn Duy cái, tụi mình đi cà phê gầy sòng nói chuyện tiếp.

Chúc Mai có một ngày 20/10 thiệt là vui vẻ!

Sơn Khánh Duy`,

    "ngoc": `Em chào chị Trịnh Thị Bảo Ngọc,

Lâu quá không gặp, dạo này chị khỏe hông? Đi làm đợt này công việc bớt lu bu chưa hay vẫn chạy deadline muốn xỉu vậy chị?

Nhân dịp 20/10, em chúc chị Ngọc ngày càng trẻ trung, xinh đẹp, công việc phơi phới, lương thưởng ngon lành và tiền vô tài khoản ào ào nha. Chúc cho mấy dự định sắp tới trong công việc của chị cái nào cũng thành công rực rỡ. Hôm nay chị nhớ tự thưởng cho mình bữa ăn thiệt ngon hoặc đi chill thư giãn nhé. Cuối tuần nào rảnh rỗi chị em mình gầy kèo gặp nhau một chuyến.

Sơn Khánh Duy`,

    "my": `Chào La Đặng Thảo My,

Ngoảnh đi ngoảnh lại mà lâu lắm rồi không gặp lại My. Dạo này đi làm công việc thế nào rồi, có bị tăng ca nhiều hông? Hôm nay tới 20/10 nên Duy nhắn tin hỏi thăm coi dạo này sống sao rồi.

Chúc Thảo My ngày 20/10 thiệt là nhiều niềm vui, công việc suôn sẻ, sếp thương đồng nghiệp quý và gặp toàn may mắn. Mong My luôn vững vàng, sự nghiệp thăng tiến và mần ăn trúng lớn nha. Dù bận rộn tới đâu cũng nhớ giữ gìn sức khỏe. Khi nào thong thả nhắn Duy, tụi mình lại đi cà phê như hồi trước.

Sơn Khánh Duy`,

    "ly": `Chào Thạch Như Lý,

Dạo này việc học trên trường đại học với mấy kế hoạch mới tới đâu rồi Lý? Tuy dạo này ít gặp nhưng Duy vẫn thỉnh thoảng thấy Lý đăng hình đi học, chạy bài tập bận rộn suốt.

Ngày 20/10, Duy chúc Như Lý lúc nào cũng năng động, tươi rói, học hành ngon lành và gặt hái được nhiều thành tích tốt trên trường. Chúc cho mấy mục tiêu Lý đang theo đuổi sớm thu về kết quả ngon lành như mong đợi. Hy vọng sớm có dịp tụ tập lại để ngồi trò chuyện nhiều hơn. Tận hưởng một ngày 20/10 thiệt trọn vẹn nha!

Sơn Khánh Duy`
};

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str.toLowerCase().trim();
}

function checkNameAndOpen() {
    const inputVal = document.getElementById('userNameInput').value;
    const cleanInput = removeVietnameseTones(inputVal);
    const errorDiv = document.getElementById('errorMessage');

    errorDiv.style.display = 'none';

    if (!cleanInput) {
        errorDiv.innerText = "⚠️ Ní ơi, nhập tên vào ô trước rồi mới ấn nhận quà được nha!";
        errorDiv.style.display = 'block';
        return;
    }

    let foundKey = null;
    if (cleanInput.includes("mai")) foundKey = "mai";
    else if (cleanInput.includes("ngoc")) foundKey = "ngoc";
    else if (cleanInput.includes("my")) foundKey = "my";
    else if (cleanInput.includes("ly")) foundKey = "ly";

    if (foundKey) {
        document.getElementById('letterContentText').innerText = messagesData[foundKey];
        document.getElementById('letterModal').style.display = 'flex';
    } else {
        errorDiv.innerText = "⚠️ Tên này hông có trong danh sách nhận quà của Duy rồi! Ní kiểm tra xem gõ đúng tên Mai, Ngọc, My hay Lý chưa nha.";
        errorDiv.style.display = 'block';
    }
}

function closeLetterModal(e) {
    e.stopPropagation();
    document.getElementById('letterModal').style.display = 'none';
    document.getElementById('envelopeWrapper').classList.remove('open');
}

function toggleEnvelope() {
    const wrapper = document.getElementById('envelopeWrapper');
    wrapper.classList.toggle('open');

    if (wrapper.classList.contains('open') && typeof confetti !== 'undefined') {
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#ff7675', '#d63031', '#fecfef', '#ffffff']
        });
    }
}
