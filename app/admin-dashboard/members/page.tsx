// app/admin-dashboard/members/page.tsx
'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  Users,
  Check,
  X,
  UserPlus,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
}

const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Saydujjaman',
    email: 'saydujjaman@example.com',
    phone: '+8801712345678',
    role: 'Founder',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2024-03-10'
  },
  {
    id: '2',
    name: 'Rubaiyat Jahan Lubna',
    email: 'rubaiyat@example.com',
    phone: '+8801812345678',
    role: 'Trainer',
    status: 'active',
    joinDate: '2023-02-20',
    lastActive: '2024-03-09'
  },
  {
    id: '3',
    name: 'Rawnok Jahan',
    email: 'rawnok@example.com',
    phone: '+8801912345678',
    role: 'Member',
    status: 'pending',
    joinDate: '2024-01-10',
    lastActive: '2024-03-08'
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+8801512345678',
    role: 'Trainer',
    status: 'active',
    joinDate: '2023-03-15',
    lastActive: '2024-03-07'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+8801612345678',
    role: 'Member',
    status: 'pending',
    joinDate: '2023-04-20',
    lastActive: '2024-02-15'
  }
];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Member',
    status: 'pending' as const
  });

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'pending': return 'outline';
      default: return 'default';
    }
  };

  const handleApprove = (member: Member) => {
    setMembers(prev => prev.map(m => 
      m.id === member.id ? { ...m, status: 'active' } : m
    ));
    toast.success(`Approved ${member.name}`);
  };

  const handleReject = (member: Member) => {
    setMembers(prev => prev.map(m => 
      m.id === member.id ? { ...m, status: 'inactive' } : m
    ));
    toast.error(`Rejected ${member.name}`);
  };

  const handleEdit = (member: Member) => {
    setEditingMember({ ...member });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingMember || !editingMember.name || !editingMember.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setMembers(prev => prev.map(m => 
      m.id === editingMember.id ? { ...editingMember } : m
    ));
    
    setIsEditDialogOpen(false);
    setEditingMember(null);
    toast.success(`Updated ${editingMember.name}`);
  };

  const handleDelete = (member: Member) => {
    setMembers(prev => prev.filter(m => m.id !== member.id));
    toast.error(`Deleted ${member.name}`);
  };

  const handleView = (member: Member) => {
    setSelectedMember(member);
    setIsViewDialogOpen(true);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newMemberData: Member = {
      id: Date.now().toString(),
      ...newMember,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    };

    setMembers(prev => [...prev, newMemberData]);
    setNewMember({
      name: '',
      email: '',
      phone: '',
      role: 'Member',
      status: 'pending'
    });
    setIsAddDialogOpen(false);
    toast.success(`Added new member: ${newMemberData.name}`);
  };

  const resetNewMember = () => {
    setNewMember({
      name: '',
      email: '',
      phone: '',
      role: 'Member',
      status: 'pending'
    });
  };

  // Export to Excel
const handleExportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(members);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
  XLSX.writeFile(workbook, "members.xlsx");
};

// Export to PDF
const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.text("Members List", 14, 10);

  autoTable(doc, {
    head: [["Name", "Email", "Phone", "Role", "Status", "Join Date", "Last Active"]],
    body: members.map((m) => [
      m.name,
      m.email,
      m.phone,
      m.role,
      m.status,
      new Date(m.joinDate).toLocaleDateString(),
      new Date(m.lastActive).toLocaleDateString(),
    ]),
    startY: 20,
  });

  doc.save("members.pdf");
};


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Members Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage all members of your organization
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="flex items-center">
      <Download className="h-4 w-4 mr-2" />
      Export
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleExportExcel}>
      Excel (.xlsx)
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleExportPDF}>
      PDF (.pdf)
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

         
          <Button 
            className="flex items-center"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter members by status or role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search members by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Founder">Founder</SelectItem>
                <SelectItem value="Trainer">Trainer</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
          <CardDescription>
            {filteredMembers.length} members found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{member.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{member.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(member.lastActive).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {member.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            onClick={() => handleApprove(member)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleReject(member)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleView(member)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(member)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(member)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No members found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter(m => m.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Members awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new member to your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={newMember.phone}
                onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newMember.role}
                onValueChange={(value) => setNewMember({...newMember, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Trainer">Trainer</SelectItem>
                  <SelectItem value="Founder">Founder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              resetNewMember();
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update the member details below.
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name *</Label>
                <Input
                  id="edit-name"
                  placeholder="Enter full name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email Address *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  placeholder="Enter email address"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  placeholder="Enter phone number"
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editingMember.role}
                  onValueChange={(value) => setEditingMember({...editingMember, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Trainer">Trainer</SelectItem>
                    <SelectItem value="Founder">Founder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingMember.status}
                  onValueChange={(value: 'active' | 'inactive' | 'pending') => 
                    setEditingMember({...editingMember, status: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Member Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>
              View detailed information about this member.
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm">{selectedMember.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <Badge variant="secondary">{selectedMember.role}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedMember.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{selectedMember.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusVariant(selectedMember.status)}>
                    {selectedMember.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Join Date</Label>
                  <p className="text-sm">{new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Last Active</Label>
                <p className="text-sm">{new Date(selectedMember.lastActive).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}