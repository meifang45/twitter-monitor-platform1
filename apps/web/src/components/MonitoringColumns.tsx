'use client'

import { useState } from 'react'
import { RefreshCw, Plus, Heart, MessageCircle, Repeat2, MoreHorizontal, X, Edit, Settings } from 'lucide-react'

interface MonitorColumn {
  id: string
  title: string
  description?: string
  tweetCount: number
  isHot?: boolean
  lastUpdated: string
  tweets: Tweet[]
}

interface Tweet {
  id: string
  author: string
  username: string
  content: string
  timestamp: string
  likes: number
  retweets: number
  replies: number
  hasVideo?: boolean
  hasImage?: boolean
}

const initialColumns: MonitorColumn[] = [
  {
    id: '1',
    title: '智能体',
    tweetCount: 40,
    isHot: true,
    lastUpdated: '2025/6/27',
    tweets: [
      {
        id: '1',
        author: '黄爱',
        username: 'huangyun_122',
        content: '又一个 AI 小生意，啊呜，今儿用 Coze 做了个说书版的智能体，工具如下：1/ 剪映小助手 2/ Coze 自带画图插件 3/ 选择(牛逼) 40秒的小视频，耗时 2分钟，不到5毛成本，1天10个视频，能不能上红书，查个说有意思的小伙伴，评论区扣1，满 100个，我来公开规版码 https://t.co/ZhdTEbPWFb',
        timestamp: '2025/7/10',
        likes: 141,
        retweets: 356,
        replies: 661,
        hasVideo: true
      }
    ]
  },
  {
    id: '2', 
    title: 'n8n',
    tweetCount: 100,
    isHot: true,
    lastUpdated: '2025/6/27',
    tweets: [
      {
        id: '2',
        author: 'Julian Goldie SEO',
        username: 'JulianGoldieSEO',
        content: 'FREE AI Workflow That Posts While You Sleep! This automation gives you fresh, done-for-you content daily— just copy our exact prompt + video creation engine. ✅ Here\'s What You Get: ➤ Step-by-step N8N automation blueprint ➤ Google Sheet template to organize video ideas & https://t.co/wWwC49D8LS',
        timestamp: '2025/6/24',
        likes: 80,
        retweets: 429,
        replies: 620,
        hasImage: true
      }
    ]
  },
  {
    id: '3',
    title: 'dify',
    tweetCount: 25,
    isHot: true,
    lastUpdated: '2025/6/27',
    tweets: [
      {
        id: '3',
        author: 'RVF ON',
        username: 'redvelless',
        content: '[rvf] difotoin seulgi difotoin yeri',
        timestamp: '2',
        likes: 573,
        retweets: 61,
        replies: 1
      },
      {
        id: '4',
        author: 'DEFY',
        username: 'defyeth',
        content: 'Engage with this tweet🧵 Thank',
        timestamp: '2023/6',
        likes: 264,
        retweets: 52,
        replies: 121
      }
    ]
  }
]

export default function MonitoringColumns() {
  const [columns, setColumns] = useState<MonitorColumn[]>(initialColumns)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingColumn, setEditingColumn] = useState<string | null>(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: MonitorColumn = {
        id: Date.now().toString(),
        title: newColumnTitle.trim(),
        tweetCount: 0,
        lastUpdated: new Date().toLocaleDateString('zh-CN'),
        tweets: []
      }
      setColumns([...columns, newColumn])
      setNewColumnTitle('')
      setShowAddModal(false)
    }
  }

  const deleteColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.id !== columnId))
  }

  // const updateColumnTitle = (columnId: string, newTitle: string) => {
  //   setColumns(columns.map(col => 
  //     col.id === columnId ? { ...col, title: newTitle } : col
  //   ))
  //   setEditingColumn(null)
  // }

  const refreshColumn = (columnId: string) => {
    // 模拟刷新功能
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, lastUpdated: new Date().toLocaleDateString('zh-CN') }
        : col
    ))
  }

  const TweetCard = ({ tweet }: { tweet: Tweet }) => (
    <div className="flex space-x-3 mb-4">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm mb-1">
          <span className="font-medium">{tweet.author} @{tweet.username}</span>
          <span className="text-gray-500">• {tweet.timestamp}</span>
        </div>
        <div className="text-sm text-gray-800 mb-3 leading-relaxed">
          {tweet.content}
        </div>
        {tweet.hasVideo && (
          <div className="w-full h-32 bg-black rounded-lg mb-3 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 text-white text-sm">0:00</div>
          </div>
        )}
        {tweet.hasImage && (
          <div className="w-full h-48 bg-gray-900 rounded-lg mb-3 relative overflow-hidden">
            <div className="p-4 text-white">
              <div className="text-sm text-blue-400 mb-4">Stage 1</div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">📊</span>
                </div>
                <div className="text-sm">Research Trend Ideas</div>
              </div>
              <div className="text-sm text-gray-400 mb-2">Stage 2</div>
              <div className="text-sm text-gray-400 mb-2">Stage 3</div>
              <div className="text-sm text-gray-400 mb-2">Stage 4</div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                  Comment &quot;YES!&quot; below ⬇
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-6 text-gray-500 text-sm">
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{tweet.replies}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Repeat2 className="h-4 w-4" />
            <span>{tweet.retweets}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{tweet.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 12V8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/>
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Twitter 监控台</h1>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => columns.forEach(col => refreshColumn(col.id))}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">全部刷新</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>添加监控列 ({columns.length}/10)</span>
          </button>
        </div>
      </div>

      {/* Dynamic Columns Grid */}
      <div className={`grid gap-6 ${
        columns.length === 1 ? 'grid-cols-1 max-w-md' :
        columns.length === 2 ? 'grid-cols-2' :
        columns.length === 3 ? 'grid-cols-3' :
        columns.length === 4 ? 'grid-cols-4' :
        'grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      }`}>
        {columns.map((column) => (
          <div key={column.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Column Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                {editingColumn === column.id ? (
                  <input
                    type="text"
                    value={column.title}
                    onChange={(e) => {
                      const newTitle = e.target.value
                      setColumns(columns.map(col => 
                        col.id === column.id ? { ...col, title: newTitle } : col
                      ))
                    }}
                    onBlur={() => setEditingColumn(null)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setEditingColumn(null)
                      }
                    }}
                    className="font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-amber-600"
                    autoFocus
                  />
                ) : (
                  <span className="font-semibold text-gray-900">{column.title}</span>
                )}
                <div className="flex items-center space-x-2 ml-auto">
                  <button 
                    onClick={() => setEditingColumn(column.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="编辑列名"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded" title="设置">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => refreshColumn(column.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="刷新"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded" title="添加关键词">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteColumn(column.id)}
                    className="p-1 hover:bg-gray-100 rounded text-red-500"
                    title="删除列"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                {column.tweetCount > 0 && (
                  <>
                    <Heart className="h-3 w-3" />
                    <span>{column.tweetCount}+</span>
                  </>
                )}
                {column.isHot && (
                  <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">热门</span>
                )}
              </div>
              <div className="text-xs text-gray-500">最后更新: {column.lastUpdated}</div>
            </div>

            {/* Tweet Cards */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {column.tweets.length > 0 ? (
                column.tweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-sm">暂无推文</div>
                  <div className="text-xs mt-1">添加关键词开始监控</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Column Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">添加新监控列</h3>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="输入监控列名称（如：AI工具、区块链、科技新闻等）"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && addColumn()}
            />
            <div className="flex space-x-3">
              <button
                onClick={addColumn}
                disabled={!newColumnTitle.trim()}
                className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                添加
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewColumnTitle('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}