var bibleBooks = [
    { code: 'gen', name: '창세기', chapters: 50 },
    { code: 'exo', name: '출애굽기', chapters: 40 },
    { code: 'lev', name: '레위기', chapters: 27 },
    { code: 'num', name: '민수기', chapters: 36 },
    { code: 'deu', name: '신명기', chapters: 34 },
    { code: 'jos', name: '여호수아', chapters: 24 },
    { code: 'jdg', name: '사사기', chapters: 21 },
    { code: 'rut', name: '룻기', chapters: 4 },
    { code: '1sa', name: '사무엘상', chapters: 31 },
    { code: '2sa', name: '사무엘하', chapters: 24 },
    { code: '1ki', name: '열왕기상', chapters: 22 },
    { code: '2ki', name: '열왕기하', chapters: 25 },
    { code: '1ch', name: '역대상', chapters: 29 },
    { code: '2ch', name: '역대하', chapters: 36 },
    { code: 'ezr', name: '에스라', chapters: 10 },
    { code: 'neh', name: '느헤미야', chapters: 13 },
    { code: 'est', name: '에스더', chapters: 10 },
    { code: 'job', name: '욥기', chapters: 42 },
    { code: 'psa', name: '시편', chapters: 150 },
    { code: 'pro', name: '잠언', chapters: 31 },
    { code: 'ecc', name: '전도서', chapters: 12 },
    { code: 'sng', name: '아가', chapters: 8 },
    { code: 'isa', name: '이사야', chapters: 66 },
    { code: 'jer', name: '예레미야', chapters: 52 },
    { code: 'lam', name: '예레미야애가', chapters: 5 },
    { code: 'ezk', name: '에스겔', chapters: 48 },
    { code: 'dan', name: '다니엘', chapters: 12 },
    { code: 'hos', name: '호세아', chapters: 14 },
    { code: 'jol', name: '요엘', chapters: 3 },
    { code: 'amo', name: '아모스', chapters: 9 },
    { code: 'oba', name: '오바댜', chapters: 1 },
    { code: 'jon', name: '요나', chapters: 4 },
    { code: 'mic', name: '미가', chapters: 7 },
    { code: 'nam', name: '나훔', chapters: 3 },
    { code: 'hab', name: '하박국', chapters: 3 },
    { code: 'zep', name: '스바냐', chapters: 3 },
    { code: 'hag', name: '학개', chapters: 2 },
    { code: 'zec', name: '스가랴', chapters: 14 },
    { code: 'mal', name: '말라기', chapters: 4 },
    { code: 'mat', name: '마태복음', chapters: 28 },
    { code: 'mrk', name: '마가복음', chapters: 16 },
    { code: 'luk', name: '누가복음', chapters: 24 },
    { code: 'jhn', name: '요한복음', chapters: 21 },
    { code: 'act', name: '사도행전', chapters: 28 },
    { code: 'rom', name: '로마서', chapters: 16 },
    { code: '1co', name: '고린도전서', chapters: 16 },
    { code: '2co', name: '고린도후서', chapters: 13 },
    { code: 'gal', name: '갈라디아서', chapters: 6 },
    { code: 'eph', name: '에베소서', chapters: 6 },
    { code: 'php', name: '빌립보서', chapters: 4 },
    { code: 'col', name: '골로새서', chapters: 4 },
    { code: '1th', name: '데살로니가전서', chapters: 5 },
    { code: '2th', name: '데살로니가후서', chapters: 3 },
    { code: '1ti', name: '디모데전서', chapters: 6 },
    { code: '2ti', name: '디모데후서', chapters: 4 },
    { code: 'tit', name: '디도서', chapters: 3 },
    { code: 'phm', name: '빌레몬서', chapters: 1 },
    { code: 'heb', name: '히브리서', chapters: 13 },
    { code: 'jas', name: '야고보서', chapters: 5 },
    { code: '1pe', name: '베드로전서', chapters: 5 },
    { code: '2pe', name: '베드로후서', chapters: 3 },
    { code: '1jn', name: '요한일서', chapters: 5 },
    { code: '2jn', name: '요한이서', chapters: 1 },
    { code: '3jn', name: '요한삼서', chapters: 1 },
    { code: 'jud', name: '유다서', chapters: 1 },
    { code: 'rev', name: '요한계시록', chapters: 22 }
];

var currentBook = '';
var currentChapter = 1;
var currentBookIndex = 0;
var selectedBookElement = null;
var favorites = [];
var lastScrollTop = 0;

function initBooks() {
    var list = document.getElementById('bibleList');
    list.innerHTML = '';

    bibleBooks.forEach(function(book, index) {
        var container = document.createElement('div');
        container.className = 'book-item-container';
        container.dataset.name = book.name.toLowerCase();
        container.id = 'book-' + index;
        
        var bookDiv = document.createElement('div');
        bookDiv.className = 'book-item';
        bookDiv.innerHTML = '<div class="book-name">' + book.name + '</div>';
        bookDiv.onclick = function() { toggleBook(book.code, index, bookDiv, container); };
        
        container.appendChild(bookDiv);
        list.appendChild(container);
    });
}

function toggleBook(code, index, element, container) {
    var grid = container.querySelector('.chapter-grid');
    
    if (selectedBookElement === element && grid) {
        grid.remove();
        element.classList.remove('selected');
        selectedBookElement = null;
        return;
    }

    if (selectedBookElement) {
        selectedBookElement.classList.remove('selected');
        var oldContainer = selectedBookElement.closest('.book-item-container');
        var oldGrid = oldContainer.querySelector('.chapter-grid');
        if (oldGrid) {
            oldGrid.remove();
        }
    }

    element.classList.add('selected');
    selectedBookElement = element;
    currentBook = code;
    currentBookIndex = index;

    var newGrid = document.createElement('div');
    newGrid.className = 'chapter-grid';

    var book = bibleBooks[index];
    for (var i = 1; i <= book.chapters; i++) {
        var btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.textContent = i;
        btn.onclick = (function(ch) {
            return function(e) {
                e.stopPropagation();
                selectChapter(ch);
            };
        })(i);
        newGrid.appendChild(btn);
    }

    container.appendChild(newGrid);
    
    setTimeout(function() {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function selectChapter(ch) {
    currentChapter = ch;
    showContent();
}

function showContent() {
    document.getElementById('contentView').classList.add('active');
    updateDisplay();
    setupScrollListener();
    updateFavoriteIcon();
    
    var contentView = document.getElementById('contentView');
    contentView.scrollTop = 0;
}

function closeContent() {
    document.getElementById('contentView').classList.remove('active');
    var contentView = document.getElementById('contentView');
    contentView.removeEventListener('scroll', handleContentScroll);
}

function updateDisplay() {
    var book = bibleBooks[currentBookIndex];
    
    document.getElementById('verseBook').textContent = book.name;
    document.getElementById('verseChapter').textContent = currentChapter;
    document.getElementById('navTitle').textContent = book.name + ' ' + currentChapter;
    
    var verseDisplay = document.getElementById('verseDisplay');
    // iframe 대신 내용을 직접 표시하는 로직
    // ibibles.net에서 구절을 가져오는 것은 CORS 문제 등으로 인해 서버 측 처리가 필요합니다.
    // 여기서는 구절을 직접 표시하는 예시로 대체합니다.
    
    // 실제 구현 시에는 서버 API를 통해 구절 텍스트를 가져와야 합니다.
    // 예시: fetch('/api/bible?book=' + currentBook + '&chapter=' + currentChapter)
    //         .then(response => response.text())
    //         .then(html => verseDisplay.innerHTML = html);

    // 임시로 구절이 표시되는 것처럼 보이도록 내용을 채웁니다.
    verseDisplay.innerHTML = '<p><strong>' + book.name + ' ' + currentChapter + '장</strong></p>' +
                             '<p>이것은 iframe을 사용하지 않고 전체 화면에 구절을 표시하는 예시입니다.</p>' +
                             '<p>실제 구절 내용은 서버 API를 통해 가져와야 합니다.</p>' +
                             '<p>구절을 직접 표시하므로, 페이지 전환 없이 빠른 로딩이 가능합니다.</p>' +
                             '<p>스크롤을 내리면 하단 네비게이션이 사라지고, 올리면 다시 나타납니다.</p>' +
                             '<p>이전/다음 버튼을 눌러 장을 이동해 보세요.</p>' +
                             '<div style="height: 1000px; background: #f0f0f0; padding: 20px; text-align: center;">긴 내용 스크롤 테스트 영역</div>';
}

function setupScrollListener() {
    var contentView = document.getElementById('contentView');
    var navigationBar = document.getElementById('navigationBar');
    var bottomNav = document.getElementById('bottomNav');
    
    contentView.removeEventListener('scroll', handleContentScroll);
    contentView.addEventListener('scroll', handleContentScroll);
}

function handleContentScroll() {
    var contentView = document.getElementById('contentView');
    var navigationBar = document.getElementById('navigationBar');
    var bottomNav = document.getElementById('bottomNav');
    var scrollTop = contentView.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navigationBar.classList.add('hidden');
        bottomNav.classList.remove('hidden');
    } else if (scrollTop < lastScrollTop) {
        navigationBar.classList.remove('hidden');
        bottomNav.classList.add('hidden');
    }
    
    lastScrollTop = scrollTop;
}

function navigatePrev() {
    if (currentChapter > 1) {
        currentChapter--;
        updateDisplay();
        document.getElementById('contentView').scrollTop = 0;
    } else if (currentBookIndex > 0) {
        currentBookIndex--;
        currentBook = bibleBooks[currentBookIndex].code;
        currentChapter = bibleBooks[currentBookIndex].chapters;
        updateDisplay();
        document.getElementById('contentView').scrollTop = 0;
        showAlert(bibleBooks[currentBookIndex].name + ' ' + currentChapter + '장으로 이동');
    }
    updateFavoriteIcon();
}

function navigateNext() {
    var book = bibleBooks[currentBookIndex];
    if (currentChapter < book.chapters) {
        currentChapter++;
        updateDisplay();
        document.getElementById('contentView').scrollTop = 0;
    } else if (currentBookIndex < bibleBooks.length - 1) {
        currentBookIndex++;
        currentBook = bibleBooks[currentBookIndex].code;
        currentChapter = 1;
        updateDisplay();
        document.getElementById('contentView').scrollTop = 0;
        showAlert(bibleBooks[currentBookIndex].name + ' 1장으로 이동');
    }
    updateFavoriteIcon();
}

document.getElementById('searchInput').addEventListener('input', function() {
    var query = this.value.toLowerCase();
    var containers = document.querySelectorAll('.book-item-container');
    var hasResults = false;

    containers.forEach(function(container) {
        var bookName = container.dataset.name;
        if (bookName.includes(query)) {
            container.style.display = 'block';
            hasResults = true;
        } else {
            container.style.display = 'none';
        }
    });

    document.getElementById('noResults').style.display = hasResults || query === '' ? 'none' : 'block';
});

function toggleFavorite() {
    var book = bibleBooks[currentBookIndex];

    var fav = {
        bookIndex: currentBookIndex,
        book: currentBook,
        chapter: currentChapter,
        title: book.name + ' ' + currentChapter,
        date: new Date().toISOString().split('T')[0] // 날짜 추가
    };

    var idx = favorites.findIndex(function(f) {
        return f.book === currentBook && f.chapter === currentChapter;
    });

    if (idx >= 0) {
    favorites.splice(idx, 1);
    showAlert('즐겨찾기에서 제거되었습니다');
} else {
    favorites.push(fav);
    // 날짜별로 내림차순 정렬 (최신 날짜가 위로)
    favorites.sort((a, b) => new Date(b.date) - new Date(a.date)); 
    showAlert('⭐ 즐겨찾기에 추가되었습니다');
}

    updateFavoriteIcon();
}

function updateFavoriteIcon() {
    var isFav = favorites.some(function(f) {
        return f.book === currentBook && f.chapter === currentChapter;
    });

    var icon = document.getElementById('favIcon');
    icon.textContent = isFav ? '💚' : '⭐';
}

function showFavoritesModal() {
    var modal = document.getElementById('favoritesModal');
    var body = document.getElementById('favoritesModalBody');
    
    if (favorites.length === 0) {
        body.innerHTML = '<div class="empty-favorites">저장된 즐겨찾기가 없습니다</div>';
    } else {
        body.innerHTML = '';
        
        // 날짜별로 그룹화
        var groupedFavorites = favorites.reduce((acc, fav) => {
            (acc[fav.date] = acc[fav.date] || []).push(fav);
            return acc;
        }, {});

        // 날짜 그룹을 순회하며 HTML 생성 (날짜 내림차순 정렬은 이미 toggleFavorite에서 처리됨)
        for (const date in groupedFavorites) {
            var dateGroup = document.createElement('div');
            dateGroup.className = 'date-group';
            dateGroup.innerHTML = '<h3>' + date + '</h3>';
            
            groupedFavorites[date].forEach(function(fav, idx) {
                var item = document.createElement('div');
                item.className = 'favorite-item';
                item.dataset.index = favorites.findIndex(f => f === fav); // 실제 favorites 배열의 인덱스
                item.innerHTML = '<div class="favorite-info">' +
                                    '<span class="favorite-text">' + fav.title + '</span>' +
                                    '<div class="verse-preview" style="display: none;"></div>' + // 구절 표시 영역
                                '</div>' +
                                '<button class="delete-btn" onclick="event.stopPropagation(); deleteFavorite(' + item.dataset.index + ')">삭제</button>';
                
                item.onclick = function(e) {
                    if (e.target.tagName !== 'BUTTON') {
                        toggleVersePreview(item, fav);
                    }
                };
                dateGroup.appendChild(item);
            });
            body.appendChild(dateGroup);
        }
    }
    
    modal.classList.add('active');
}

function closeFavoritesModal() {
    document.getElementById('favoritesModal').classList.remove('active');
}

// loadFavorite 함수는 이제 사용하지 않고 toggleVersePreview를 사용
function loadFavorite(fav) {
    currentBook = fav.book;
    currentBookIndex = fav.bookIndex;
    currentChapter = fav.chapter;
    closeFavoritesModal();
    showContent();
    showAlert('📖 ' + fav.title + '을(를) 불러왔습니다');
}

// 구절을 바로 아래에 표시하는 함수
function toggleVersePreview(itemElement, fav) {
    var preview = itemElement.querySelector('.verse-preview');
    var isVisible = preview.style.display !== 'none';

    // 다른 항목의 미리보기 닫기
    document.querySelectorAll('.verse-preview').forEach(p => {
        if (p !== preview) {
            p.style.display = 'none';
        }
    });

    if (isVisible) {
        preview.style.display = 'none';
    } else {
        // 임시 구절 내용 (실제로는 API 호출 필요)
        var book = bibleBooks.find(b => b.code === fav.book);
        var verseText = '<strong>' + fav.title + '</strong><br>' +
                        '이것은 즐겨찾기에서 바로 아래에 표시되는 구절 미리보기입니다. ' +
                        '실제 구절 내용은 서버 API 호출을 통해 가져와야 합니다. ' +
                        '현재는 ' + (book ? book.name : '') + ' ' + fav.chapter + '장의 임시 내용입니다.';

        preview.innerHTML = '<p style="margin-top: 10px; padding: 10px; background: #f9f9f9; border-radius: 8px; line-height: 1.6;">' + verseText + '</p>';
        preview.style.display = 'block';
    }
}

function deleteFavorite(idx) {
    // idx는 실제 favorites 배열의 인덱스입니다.
    favorites.splice(idx, 1);
    // 로컬 스토리지에 저장하는 로직이 없으므로, 메모리에서만 삭제됩니다.
    // 실제 구현에서는 localStorage.setItem('favorites', JSON.stringify(favorites)); 필요
    showFavoritesModal(); // 모달 재생성
    showAlert('삭제되었습니다');
}

function goBack() {
    if (document.getElementById('contentView').classList.contains('active')) {
        closeContent();
    }
}

function showAlert(msg) {
    var alert = document.getElementById('alertMsg');
    alert.textContent = msg;
    alert.className = 'alert show';
    setTimeout(function() {
        alert.className = 'alert';
    }, 2500);
}

initBooks();
