'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Monitor, 
  Settings,
  Twitter,
  BarChart3,
  FolderOpen,
  Tags,
  MessageCircle,
  History,
  Brain,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navigationSections: NavigationSection[] = [
  {
    title: '主菜单',
    items: [
      {
        title: '仪表盘',
        href: '/',
        icon: LayoutDashboard
      },
      {
        title: '用户推文',
        href: '/users',
        icon: Users
      },
      {
        title: '关键词推文',
        href: '/keywords',
        icon: Search
      },
      {
        title: 'Twitter监控台',
        href: '/console',
        icon: Monitor
      }
    ]
  },
  {
    title: '分析',
    items: [
      {
        title: '用户每日摘要',
        href: '/analytics',
        icon: BarChart3
      },
      {
        title: '用户监控管理',
        href: '/users',
        icon: Users
      },
      {
        title: '分组管理',
        href: '/analytics',
        icon: FolderOpen
      },
      {
        title: '关键词监控管理',
        href: '/keywords',
        icon: Tags
      }
    ]
  },
  {
    title: '工具',
    items: [
      {
        title: '推文模板与AI处理',
        href: '/ai-tools',
        icon: Brain
      },
      {
        title: '推特thread 生成器',
        href: '/ai-tools',
        icon: MessageCircle
      },
      {
        title: '线程生成历史',
        href: '/ai-tools',
        icon: History
      },
      {
        title: 'AI历史记录',
        href: '/ai-tools',
        icon: Brain
      },
      {
        title: '个人素材中心',
        href: '/ai-tools',
        icon: BookOpen
      }
    ]
  },
  {
    title: '管理',
    items: [
      {
        title: '设置',
        href: '/settings',
        icon: Settings
      }
    ]
  }
]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "w-64 bg-gray-50 border-r border-gray-200 flex flex-col",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
            <Twitter className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-gray-900">推特监控平台</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
        {navigationSections.map((section) => (
          <div key={section.title}>
            {/* Section Header */}
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            
            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.title === 'Twitter监控台' && pathname === '/console') ||
                  (item.title === 'Twitter监控台' && pathname === '/')
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-amber-100 text-amber-800 border-r-2 border-amber-600" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Icon className={cn(
                      "h-4 w-4 flex-shrink-0",
                      isActive ? "text-amber-700" : "text-gray-500"
                    )} />
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}