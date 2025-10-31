'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Tweet {
  id: number
  author: string
  username: string
  content: string
  timestamp: string
  likes: number
  retweets: number
  replies: number
  avatar: string
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      author: 'Elon Musk',
      username: '@elonmusk',
      content: 'Just launched another rocket to Mars 🚀',
      timestamp: '2h',
      likes: 15234,
      retweets: 3421,
      replies: 892,
      avatar: '🚀'
    },
    {
      id: 2,
      author: 'Tech News',
      username: '@technews',
      content: 'Breaking: New AI model shows incredible performance on benchmarks',
      timestamp: '4h',
      likes: 8932,
      retweets: 2134,
      replies: 445,
      avatar: '📱'
    },
    {
      id: 3,
      author: 'Developer',
      username: '@developer',
      content: 'Finally fixed that bug that\'s been haunting me for days! Time to celebrate 🎉',
      timestamp: '6h',
      likes: 1234,
      retweets: 234,
      replies: 56,
      avatar: '💻'
    }
  ])

  const [newTweet, setNewTweet] = useState('')
  const [activeTab, setActiveTab] = useState('forYou')

  const handlePostTweet = () => {
    if (newTweet.trim()) {
      const tweet: Tweet = {
        id: tweets.length + 1,
        author: 'You',
        username: '@you',
        content: newTweet,
        timestamp: 'now',
        likes: 0,
        retweets: 0,
        replies: 0,
        avatar: '👤'
      }
      setTweets([tweet, ...tweets])
      setNewTweet('')
    }
  }

  const handleLike = (id: number) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
    ))
  }

  const handleRetweet = (id: number) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id ? { ...tweet, retweets: tweet.retweets + 1 } : tweet
    ))
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>𝕏</div>
        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.icon}>🏠</span>
            <span>Home</span>
          </button>
          <button className={styles.navItem}>
            <span className={styles.icon}>🔍</span>
            <span>Explore</span>
          </button>
          <button className={styles.navItem}>
            <span className={styles.icon}>🔔</span>
            <span>Notifications</span>
          </button>
          <button className={styles.navItem}>
            <span className={styles.icon}>✉️</span>
            <span>Messages</span>
          </button>
          <button className={styles.navItem}>
            <span className={styles.icon}>👤</span>
            <span>Profile</span>
          </button>
        </nav>
        <button className={styles.tweetButton}>Post</button>
      </aside>

      {/* Main Feed */}
      <main className={styles.main}>
        <div className={styles.header}>
          <button
            className={`${styles.tab} ${activeTab === 'forYou' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('forYou')}
          >
            For you
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'following' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </div>

        {/* Tweet Composer */}
        <div className={styles.composer}>
          <div className={styles.composerAvatar}>👤</div>
          <div className={styles.composerInput}>
            <textarea
              placeholder="What is happening?!"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              rows={3}
            />
            <div className={styles.composerActions}>
              <div className={styles.composerIcons}>
                <button>🖼️</button>
                <button>🎬</button>
                <button>📊</button>
                <button>😊</button>
              </div>
              <button
                className={styles.postButton}
                onClick={handlePostTweet}
                disabled={!newTweet.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Tweet Feed */}
        <div className={styles.feed}>
          {tweets.map(tweet => (
            <article key={tweet.id} className={styles.tweet}>
              <div className={styles.tweetAvatar}>{tweet.avatar}</div>
              <div className={styles.tweetContent}>
                <div className={styles.tweetHeader}>
                  <span className={styles.author}>{tweet.author}</span>
                  <span className={styles.username}>{tweet.username}</span>
                  <span className={styles.timestamp}>· {tweet.timestamp}</span>
                </div>
                <p className={styles.tweetText}>{tweet.content}</p>
                <div className={styles.tweetActions}>
                  <button className={styles.action}>
                    <span>💬</span>
                    <span>{tweet.replies}</span>
                  </button>
                  <button
                    className={styles.action}
                    onClick={() => handleRetweet(tweet.id)}
                  >
                    <span>🔄</span>
                    <span>{tweet.retweets}</span>
                  </button>
                  <button
                    className={styles.action}
                    onClick={() => handleLike(tweet.id)}
                  >
                    <span>❤️</span>
                    <span>{tweet.likes}</span>
                  </button>
                  <button className={styles.action}>
                    <span>📊</span>
                  </button>
                  <button className={styles.action}>
                    <span>📤</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className={styles.rightSidebar}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search" />
        </div>

        <div className={styles.widget}>
          <h2>What's happening</h2>
          <div className={styles.trend}>
            <div className={styles.trendCategory}>Trending in Technology</div>
            <div className={styles.trendTitle}>#AI</div>
            <div className={styles.trendStats}>125K posts</div>
          </div>
          <div className={styles.trend}>
            <div className={styles.trendCategory}>Trending Worldwide</div>
            <div className={styles.trendTitle}>#WebDev</div>
            <div className={styles.trendStats}>89.3K posts</div>
          </div>
          <div className={styles.trend}>
            <div className={styles.trendCategory}>Trending in Tech</div>
            <div className={styles.trendTitle}>#JavaScript</div>
            <div className={styles.trendStats}>56.7K posts</div>
          </div>
        </div>

        <div className={styles.widget}>
          <h2>Who to follow</h2>
          <div className={styles.followSuggestion}>
            <div className={styles.followAvatar}>🚀</div>
            <div className={styles.followInfo}>
              <div className={styles.followName}>Space X</div>
              <div className={styles.followUsername}>@spacex</div>
            </div>
            <button className={styles.followButton}>Follow</button>
          </div>
          <div className={styles.followSuggestion}>
            <div className={styles.followAvatar}>🤖</div>
            <div className={styles.followInfo}>
              <div className={styles.followName}>OpenAI</div>
              <div className={styles.followUsername}>@openai</div>
            </div>
            <button className={styles.followButton}>Follow</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
