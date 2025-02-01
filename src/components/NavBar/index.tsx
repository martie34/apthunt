import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { useCallback } from 'react'
import { To, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  const menuItems: ItemType<MenuItemType>[] = [
    { label: 'Budgets', key: '/', className: 'p-4' },
    { label: 'Apartments', key: '/apartments', className: 'p-4' },
    { label: 'Cars', key: '/cars', className: 'p-4' },
    { label: 'Gas', key: '/gas', className: 'p-4' }
  ]

  const handleClick = useCallback(
    (e: { key: To }) => {
      if (e) navigate(e.key)
    },
    [navigate]
  )

  return (
    <Menu
      className="text-xl"
      mode="horizontal"
      items={menuItems}
      onClick={handleClick}
      selectedKeys={[window.location.pathname]}
    />
  )
}

export default NavBar
