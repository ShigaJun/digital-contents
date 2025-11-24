import { Post } from '@/types/post';

export const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    username: '猫好きさん',
    location: '東京都渋谷区付近',
    imageUrl: '/images/dummycat.png',
    body: '公園でのんびりしている猫を見つけました。とても人懐っこいです！',
    likes: ['user1', 'user2', 'user3'],
    likeCount: 3,
    replies: [
      {
        id: 'reply1',
        username: 'にゃんこ先生',
        body: 'かわいい！今度行ってみます。',
        likes: ['user4'],
        likeCount: 1,
      },
    ],
  },
  {
    id: '2',
    username: '路地裏ウォッチャー',
    location: '神奈川県横浜市中区あたり',
    imageUrl: '/images/dummycat.png',
    body: '細い路地で毛づくろいしてました。警戒心が強い子みたいです。',
    likes: ['user1', 'user5'],
    likeCount: 2,
    replies: [],
  },
  {
    id: '3',
    username: 'CatLover_JP',
    location: '大阪府大阪市中央区',
    imageUrl: '/images/dummycat.png',
    body: 'お店の看板猫ちゃん。おとなしくて撫でさせてくれました。',
    likes: ['user2', 'user3', 'user4', 'user5'],
    likeCount: 4,
    replies: [],
  },
];
