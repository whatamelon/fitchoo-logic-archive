const exhibition = {
  state() {
    return {
      EXHIBITIONS: [
        {
          code: "00pe29",
          thumbnail: "/exhibition/wideSlacks.jpg",
          title: "유행 와이드핏 슬랙스",
          subtitle: "골반좁은 언니들이라면 반가울",
          hashtags: ["내체형에꼭맞는유행  ","골반이좁은편인모델착샷!"],
          cardType: "C"
        },
        {
          code: "16re28",
          thumbnail: "/exhibition/shortJacket.jpg",
          title: "핸드메이드 숏자켓",
          subtitle: "요즘 입기 딱 좋은",
          hashtags: ["오늘은숏버젼 ","모델의키를확인해보세요!"],
          cardType: "A"
        },
        {
          code: "15re27",
          thumbnail: "/exhibition/longCoat.jpg",
          title: "핸드메이드 롱코트",
          subtitle: "작은 핏으로 딱 맞게!",
          hashtags: ["올겨울롱코트도","키작녀모델핏으로보기"],
          cardType: "A"
        },
        {
          code: "15re26",
          thumbnail: "/exhibition/beltShotJacket.jpg",
          title: "허리벨트 숏자켓",
          subtitle: "긴허리 커버하는",
          hashtags: ["허리긴키작녀라면  ","키작녀모델착장샷"],
          cardType: "C"
        },
        {
          code: "15re25",
          thumbnail: "/exhibition/longBoots.jpg",
          title: "가을겨울 롱부츠",
          subtitle: "키작녀 모델 피팅으로 보는",
          hashtags: ["무릎에걸리지않도록 ","키작녀모델착샷"],
          cardType: "B"
        },
        {
          code: "15re24",
          thumbnail: "/exhibition/animalPrint.jpg",
          title: "애니멀 프린트 모음전",
          subtitle: "키작녀 모델이 피팅한",
          hashtags: ["올겨울핫트랜드","키작녀모델착샷"],
          cardType: "B"
        },
        {
          code: "00re23",
          thumbnail: "/exhibition/HLineOnePiece.jpg",
          title: "H라인 원피스가 꿀템!",
          subtitle: "골반이 좁아요?",
          hashtags: ["역삼각형체형","트렌치코트랑굿매치"],
          cardType: "A"
        },
        {
          code: "15re22",
          thumbnail: "/exhibition/realHigh.jpg",
          title: "하이웨스트 팬츠",
          subtitle: "키작녀의 만년 잇템",
          hashtags: ["리얼하이","키작녀모델착샷"],
          cardType: "C"
        },
        {
          code: "00pe21",
          thumbnail: "/exhibition/pelvis_Denim.png",
          title: "언니들의 데님",
          subtitle: "넓은 골반이 특장점인",
          hashtags: ["허리도맞추고힙도맞추고","골반넓은편모엿"],
          cardType: "B"
        },
        {
          code: "00re20",
          thumbnail: "/exhibition/longT.jpg",
          title: "긴팔 티셔츠 다모음",
          subtitle: "팔 길이 걱정없는",
          hashtags: ["무지에서줄무늬까지","팔긴언니들을위한긴팔도많아"],
          cardType: "B"
        },
        {
          code: "00sh19",
          thumbnail: "/exhibition/hood.jpg",
          title: "여리핏 후드티",
          subtitle: "어깨 넓은 언니들의",
          hashtags: ["후드가클수록여리여리","어깨가넓은모델착샷"],
          cardType: "C"
        },
        {
          code: "15re18",
          thumbnail: "/exhibition/hagekDress.jpg",
          title: "가을 하객룩 원피스",
          subtitle: "아담한 나에게 딱 맞춘",
          hashtags: ["키작녀핏한눈에확인","키작녀모델착샷"],
          cardType: "C"
        },
        {
          code: "00sh17",
          thumbnail: "/exhibition/vNeck.jpg",
          title: "브이넥 니트&가디건",
          subtitle: "넓은 어깨 소멸시키는",
          hashtags: ["내어깨어디갔어","어깨가넓은편인모델착샷"],
          cardType: "B"
        },
        {
          code: "17re16",
          thumbnail: "/exhibition/campus.jpg",
          title: "캠퍼스 청춘룩",
          subtitle: "키큰 나를 더욱 사랑스럽게 만드는",
          hashtags: ["키큰모델이입은","10대20대학생코디"],
          cardType: "B"
        },
        {
          code: "00re15",
          thumbnail: "/exhibition/anorak.jpg",
          title: "잇아이템 아노락",
          subtitle: "키가 크나 작으나 우리 모두의",
          hashtags: ["지금사면선두주자","레깅스랑입으면꿀핏"],
          cardType: "A"
        },
        {
          code: "15re14",
          thumbnail: "/exhibition/kijaknyu_jacket.jpg",
          title: "컬러풀 가을빛 자켓",
          subtitle: "아담한 나에게 딱 맞는",
          hashtags: ["지금입기딱좋은","키작녀모델착샷"],
          cardType: "C"
        },
        {
          code: "15re13",
          thumbnail: "/exhibition/kijaknyu_miniskirt.jpg",
          title: "minimini 미니스커트",
          subtitle: "키작녀에게도",
          hashtags: ["키작녀용미니기장","158이하모델착샷"],
          cardType: "C"
        },
        {
          code: "19re10",
          thumbnail: "/exhibition/alineskirt.jpg",
          title: "A라인 플레어 스커트",
          subtitle: "골반이 좁은 언니들을 위한",
          hashtags: ["허리에강조똬-악","골반이좁은편인모델착샷"],
          cardType: "B"
        },
        {
          code: "19re09",
          thumbnail: "/exhibition/croppants.jpg",
          title: "앵클 팬츠",
          subtitle: "158cm 이하 키작녀만을 위한",
          hashtags: ["딱예쁜길이발목위", "158이하모델착샷"],
          cardType: "A"
        }
      ]
    };
  },

  getters: {
    EXHIBITIONS: state => {
      return state.EXHIBITIONS;
    }
  },

  mutations: {
    SET_EXHIBITIONS(state, payload) {
      state.EXHIBITIONS = payload;
    }
  },

  actions: {}
};

export default exhibition;
