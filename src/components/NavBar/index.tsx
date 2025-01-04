import { Menu } from 'antd'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Budgets', key: '/' },
    { label: 'Apartments', key: '/apartments' }
  ]

  const handleClick = useCallback((e: any) => {
    navigate(e.key)
  }, [])

  return <Menu mode="horizontal" items={menuItems} onClick={handleClick}></Menu>
}

export default NavBar
