import type { ReactNode } from 'react'

// ============ Navigation ============
export interface NavChild {
  label: string
  path: string
}

export interface NavItem {
  label: string
  icon: string
  path?: string
  children?: NavChild[]
  submenuId?: string
}

// ============ Dashboard Cards ============
export interface StatCardProps {
  title: string
  value: string
  badge: string
  badgeClass: string
  link: string
  linkText: string
  iconClass: string
  iconBgClass: string
}

// ============ Table Row Types ============
export interface BookRow {
  id: string
  name: string
  price: number
  orders: number
  amount: number
  cover?: string
}

export interface CourseRow {
  id: string
  name: string
  price: number
  orders: number
  amount: number
  thumbnail?: string
}

export interface CustomerRow {
  id: string
  name: string
  orders: number
  totalSpent: number
  avatar?: string
}

export interface BookingRow {
  id: string
  name: string
  booking: string
  user: string
  hourSent: string
  status: string
  statusClass: string
}

export interface OrderRow {
  id: string
  customer: string
  product: string
  amount: string
  status: string
  statusClass: string
  date: string
  avatar?: string
}

// ============ Revenue Stats ============
export interface RevenueStat {
  label: string
  value: string
  prefix?: string
  suffix?: string
}

// ============ Sales Location ============
export interface SalesLocation {
  city: string
  percent: number
}

// ============ General Table ============
export interface TableColumn<T> {
  key: keyof T | string
  label: string
  align?: 'left' | 'right' | 'center'
  render?: (value: unknown, row: T) => ReactNode
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}
