import EnterpriseLayout from '@/components/EnterpriseLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { RefreshCw, Plus, Heart, MessageCircle, Repeat2, MoreHorizontal } from 'lucide-react'

export default function ConsolePage() {
  return (
    <ProtectedRoute>
      <EnterpriseLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Twitter 监控台</h1>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">全部刷新</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>添加监控列 (9/10)</span>
              </button>
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1 - 智能体 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Column Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">智能体</span>
                  <div className="flex items-center space-x-2 ml-auto">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3.89543 20.1046 3 19V17"/>
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6L18 18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Heart className="h-3 w-3" />
                  <span>40+</span>
                  <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">热门</span>
                </div>
                <div className="text-xs text-gray-500">最后更新: 2025/6/27</div>
              </div>

              {/* Tweet Card */}
              <div className="p-4">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm mb-1">
                      <span className="font-medium">黄爱 @huangyun_122</span>
                      <span className="text-gray-500">• 2025/7/10</span>
                    </div>
                    <div className="text-sm text-gray-800 mb-3 leading-relaxed">
                      又一个 AI 小生意，啊呜，今儿用 Coze 做了个说书版的智能体，工具如下：1/ 剪映小助手 2/ Coze 自带画图插件 3/ 选择(牛逼) 40秒的小视频，耗时 2分钟，不到5毛成本，1天10个视频，能不能上红书，查个说有意思的小伙伴，评论区扣1，满 100个，我来公开规版码 https://t.co/ZhdTEbPWFb
                    </div>
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
                    <div className="flex items-center space-x-6 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>661</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Repeat2 className="h-4 w-4" />
                        <span>356</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>141</span>
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
              </div>
            </div>

            {/* Column 2 - n8n */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Column Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">n8n</span>
                  <div className="flex items-center space-x-2 ml-auto">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3.89543 20.1046 3 19V17"/>
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6L18 18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Heart className="h-3 w-3" />
                  <span>100+</span>
                  <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">热门</span>
                </div>
                <div className="text-xs text-gray-500">最后更新: 2025/6/27</div>
              </div>

              {/* Tweet Card */}
              <div className="p-4 space-y-4">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm mb-1">
                      <span className="font-medium">Julian Goldie SEO @JulianGoldieSEO</span>
                      <span className="text-gray-500">• 2025/6/24</span>
                    </div>
                    <div className="text-sm text-gray-800 mb-3 leading-relaxed">
                      FREE AI Workflow That Posts While You Sleep! This automation gives you fresh, done-for-you content daily— just copy our exact prompt + video creation engine. ✅ Here&apos;s What You Get: ➤ Step-by-step N8N automation blueprint ➤ Google Sheet template to organize video ideas &amp; https://t.co/wWwC49D8LS
                    </div>
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
                    <div className="flex items-center space-x-6 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>620</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Repeat2 className="h-4 w-4" />
                        <span>429</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>80</span>
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
              </div>
            </div>

            {/* Column 3 - dify */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Column Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">dify</span>
                  <div className="flex items-center space-x-2 ml-auto">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3.89543 20.1046 3 19V17"/>
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6L18 18"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">热门</span>
                </div>
                <div className="text-xs text-gray-500">最后更新: 2025/6/27</div>
              </div>

              {/* Tweet Cards */}
              <div className="p-4 space-y-4">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm mb-1">
                      <span className="font-medium">RVF ON @redvelless</span>
                      <span className="text-gray-500">• 2</span>
                    </div>
                    <div className="text-sm text-gray-800 mb-3">
                      [rvf] difotoin seulgi difotoin yeri
                    </div>
                    <div className="flex items-center space-x-6 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>573</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>1</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Repeat2 className="h-4 w-4" />
                        <span>61</span>
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

                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm mb-1">
                      <span className="font-medium">DEFY @defyeth</span>
                      <span className="text-gray-500">• 2023/6</span>
                    </div>
                    <div className="text-sm text-gray-800 mb-3">
                      Engage with this tweet🧵 Thank
                    </div>
                    <div className="flex items-center space-x-6 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>264</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>121</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Repeat2 className="h-4 w-4" />
                        <span>52</span>
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
              </div>
            </div>
          </div>
        </div>
      </EnterpriseLayout>
    </ProtectedRoute>
  )
}