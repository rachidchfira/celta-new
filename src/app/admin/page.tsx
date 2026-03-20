'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import {
  Users,
  Plus,
  Search,
  Mail,
  Key,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Copy,
  Loader2,
  MessageCircle,
  Shield,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react'

// Types
interface Enrollment {
  id: string
  email: string
  name: string | null
  phone: string | null
  enrollmentCode: string
  paymentStatus: string
  paidAmount: number
  enrolledAt: string
  lastAccessedAt: string | null
  _count?: {
    lessonProgress: number
  }
}

// Admin authentication via API
const authenticateAdmin = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    const data = await response.json()
    return response.ok && data.success
  } catch {
    return false
  }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // New enrollment form
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newEnrollment, setNewEnrollment] = useState({
    email: '',
    name: '',
    phone: '',
    enrollmentCode: '',
    paidAmount: '80'
  })
  const [isCreating, setIsCreating] = useState(false)
  
  // Delete confirmation
  const [deleteEnrollmentId, setDeleteEnrollmentId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch enrollments when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrollments()
    }
  }, [isAuthenticated])

  const handleLogin = async () => {
    setIsLoading(true)
    const isValid = await authenticateAdmin(password)
    if (isValid) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
      setPasswordError('')
    } else {
      setPasswordError('Invalid password')
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
  }

  const fetchEnrollments = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/enrollments')
      const data = await response.json()
      if (data.success) {
        setEnrollments(data.enrollments)
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'CELTA-'
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += '-'
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  const handleCreateEnrollment = async () => {
    if (!newEnrollment.email) {
      alert('Email is required')
      return
    }

    setIsCreating(true)
    try {
      const code = newEnrollment.enrollmentCode || generateCode()
      
      const response = await fetch('/api/course/enroll', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEnrollment.email,
          name: newEnrollment.name,
          phone: newEnrollment.phone,
          enrollmentCode: code,
          paidAmount: parseInt(newEnrollment.paidAmount) || 80
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Send WhatsApp message with enrollment details
        if (newEnrollment.phone) {
          const message = `🎉 Welcome to CELTA PREP COURSE!

Your enrollment is approved! ✅
📧 Email: ${newEnrollment.email}

Access your course at: ${window.location.origin}/course

Simply enter your email address to start learning - no code needed!

Questions? Reply to this message.`
          
          window.open(`https://wa.me/${newEnrollment.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank')
        }
        
        // Reset form and refresh list
        setNewEnrollment({ email: '', name: '', phone: '', enrollmentCode: '', paidAmount: '80' })
        setShowCreateDialog(false)
        fetchEnrollments()
      } else {
        alert(data.error || 'Failed to create enrollment')
      }
    } catch (error) {
      console.error('Error creating enrollment:', error)
      alert('Failed to create enrollment')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteEnrollment = async () => {
    if (!deleteEnrollmentId) return
    
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/enrollments/${deleteEnrollmentId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setEnrollments(enrollments.filter(e => e.id !== deleteEnrollmentId))
        setDeleteEnrollmentId(null)
      } else {
        alert('Failed to delete enrollment')
      }
    } catch (error) {
      console.error('Error deleting enrollment:', error)
      alert('Failed to delete enrollment')
    } finally {
      setIsDeleting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const filteredEnrollments = enrollments.filter(e => 
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.enrollmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.name && e.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0e0c0a] to-[#1a1816] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-[#d4cdc0]">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="font-display text-2xl text-[#0e0c0a]">Admin Access</CardTitle>
            <CardDescription className="font-body text-[#6b6560]">
              Enter password to manage enrollments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-body border-[#d4cdc0] focus:border-[#c9a84c] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6560] hover:text-[#0e0c0a]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="font-body text-sm text-red-600">{passwordError}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold py-6"
              >
                Access Admin
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <header className="bg-[#0e0c0a] text-white py-4 px-4 md:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-4">
            <img 
              src="/logo.svg?v=2" 
              alt="CELTA Prep Morocco" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="font-display text-lg md:text-xl font-bold text-[#f5f0e8]">Course Admin</h1>
              <p className="font-body text-xs text-[#a09890]">Enrollment Management</p>
            </div>
          </a>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-[#a09890] hover:text-white hover:bg-white/10 font-body"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-[#d4cdc0]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="font-body text-sm text-[#6b6560]">Total Enrolled</p>
                  <p className="font-display text-2xl font-bold text-[#0e0c0a]">{enrollments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#d4cdc0]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-body text-sm text-[#6b6560]">Active</p>
                  <p className="font-display text-2xl font-bold text-[#0e0c0a]">
                    {enrollments.filter(e => e.paymentStatus === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#d4cdc0]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#b85c38]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#b85c38]" />
                </div>
                <div>
                  <p className="font-body text-sm text-[#6b6560]">Pending</p>
                  <p className="font-display text-2xl font-bold text-[#0e0c0a]">
                    {enrollments.filter(e => e.paymentStatus === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#d4cdc0]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="font-display font-bold text-blue-600">USD</span>
                </div>
                <div>
                  <p className="font-body text-sm text-[#6b6560]">Revenue</p>
                  <p className="font-display text-2xl font-bold text-[#0e0c0a]">
                    {enrollments.filter(e => e.paymentStatus === 'completed').reduce((acc, e) => acc + e.paidAmount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6560]" />
            <Input
              placeholder="Search by email, name, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-body border-[#d4cdc0] focus:border-[#c9a84c] pl-10"
            />
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Enrollment
          </Button>
        </div>

        {/* Enrollments Table */}
        <Card className="bg-white border-[#d4cdc0]">
          <CardHeader>
            <CardTitle className="font-display text-xl text-[#0e0c0a]">Enrollments</CardTitle>
            <CardDescription className="font-body text-[#6b6560]">
              Manage student enrollments and access codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#c9a84c]" />
                <p className="font-body text-[#6b6560] mt-2">Loading enrollments...</p>
              </div>
            ) : filteredEnrollments.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-[#d4cdc0] mb-4" />
                <p className="font-body text-[#6b6560]">No enrollments found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e8e0d0]">
                      <th className="text-left py-3 px-4 font-body font-semibold text-[#0e0c0a] text-sm">Student</th>
                      <th className="text-left py-3 px-4 font-body font-semibold text-[#0e0c0a] text-sm">Code</th>
                      <th className="text-left py-3 px-4 font-body font-semibold text-[#0e0c0a] text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-body font-semibold text-[#0e0c0a] text-sm">Amount</th>
                      <th className="text-left py-3 px-4 font-body font-semibold text-[#0e0c0a] text-sm">Enrolled</th>
                      <th className="text-left py-3 px-4 font-body font-semibold text-[#0e0c0a] text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b border-[#e8e0d0] hover:bg-[#f5f0e8]">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-body font-medium text-[#0e0c0a]">{enrollment.name || 'No name'}</p>
                            <p className="font-body text-sm text-[#6b6560] flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {enrollment.email}
                            </p>
                            {enrollment.phone && (
                              <p className="font-body text-xs text-[#6b6560] flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {enrollment.phone}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-sm bg-[#e8e0d0] px-2 py-1 rounded">
                              {enrollment.enrollmentCode}
                            </code>
                            <button
                              onClick={() => copyToClipboard(enrollment.enrollmentCode)}
                              className="text-[#6b6560] hover:text-[#c9a84c]"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            enrollment.paymentStatus === 'completed'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                          }>
                            {enrollment.paymentStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-body text-[#0e0c0a]">
                          ${enrollment.paidAmount} USD
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-body text-sm text-[#6b6560] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const message = `Your CELTA PREP COURSE enrollment details:

📧 Email: ${enrollment.email}
🔑 Code: ${enrollment.enrollmentCode}

Access: ${window.location.origin}/course

Questions? Reply to this message.`
                                window.open(`https://wa.me/${enrollment.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(message)}`, '_blank')
                              }}
                              className="text-green-600 hover:bg-green-50"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteEnrollmentId(enrollment.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Enrollment Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#0e0c0a]">Quick Approve Student</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">
              Enter email to approve student. They can login with just their email - no code needed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#0e0c0a]">Email *</label>
              <Input
                type="email"
                placeholder="student@email.com"
                value={newEnrollment.email}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, email: e.target.value })}
                className="font-body border-[#d4cdc0] focus:border-[#c9a84c]"
              />
            </div>
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#0e0c0a]">Name (optional)</label>
              <Input
                placeholder="Student name"
                value={newEnrollment.name}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, name: e.target.value })}
                className="font-body border-[#d4cdc0] focus:border-[#c9a84c]"
              />
            </div>
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#0e0c0a]">WhatsApp Number (optional)</label>
              <Input
                placeholder="+212 6XX XXX XXX"
                value={newEnrollment.phone}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, phone: e.target.value })}
                className="font-body border-[#d4cdc0] focus:border-[#c9a84c]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-[#0e0c0a]">Amount (USD)</label>
                <Input
                  type="number"
                  value={newEnrollment.paidAmount}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, paidAmount: e.target.value })}
                  className="font-body border-[#d4cdc0] focus:border-[#c9a84c]"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-[#0e0c0a]">Custom Code (optional)</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Auto-generate"
                    value={newEnrollment.enrollmentCode}
                    onChange={(e) => setNewEnrollment({ ...newEnrollment, enrollmentCode: e.target.value.toUpperCase() })}
                    className="font-body border-[#d4cdc0] focus:border-[#c9a84c] uppercase"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setNewEnrollment({ ...newEnrollment, enrollmentCode: generateCode() })}
                    className="font-body"
                  >
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="font-body text-sm text-green-700">
                ✓ After approval, the student can login with just their email address at /course
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateEnrollment}
              disabled={isCreating || !newEnrollment.email}
              className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve Student
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteEnrollmentId} onOpenChange={() => setDeleteEnrollmentId(null)}>
        <DialogContent className="bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#0e0c0a]">Delete Enrollment?</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">
              This action cannot be undone. The student will lose access to the course.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteEnrollmentId(null)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteEnrollment}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700 font-body font-semibold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
