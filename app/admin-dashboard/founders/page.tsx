// app/admin-dashboard/founders/page.tsx
'use client';

import { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  Edit,
  Trash2,
  Eye,
  Crown,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Founder {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const initialFounders: Founder[] = [
  {
    id: '1',
    name: 'Saydujjaman',
    email: 'saydujjaman@example.com',
    phone: '+8801712345678',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Another Founder',
    email: 'founder@example.com',
    phone: '+8801812345678',
    status: 'active',
    joinDate: '2023-02-20',
  }
];

export default function FoundersPage() {
  const [founders, setFounders] = useState<Founder[]>(initialFounders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredFounders = founders.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.phone.includes(searchQuery)
  );

  const handleDelete = (founder: Founder) => {
    setFounders(prev => prev.filter(f => f.id !== founder.id));
    toast.error(`Deleted ${founder.name}`);
  };

  const handleView = (founder: Founder) => {
    setSelectedFounder(founder);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
            Founders Board
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and view the founders of your organization
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find founders by name, email, or phone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search founders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Founders List</CardTitle>
          <CardDescription>{filteredFounders.length} founders found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFounders.map((founder) => (
                <TableRow key={founder.id}>
                  <TableCell className="font-medium">{founder.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{founder.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{founder.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={founder.status === 'active' ? 'default' : 'secondary'}>
                      {founder.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(founder.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(founder)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(founder)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredFounders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No founders found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Founder Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Founder Details</DialogTitle>
            <DialogDescription>View detailed info about this founder</DialogDescription>
          </DialogHeader>
          {selectedFounder && (
            <div className="grid gap-4 py-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm">{selectedFounder.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm">{selectedFounder.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm">{selectedFounder.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={selectedFounder.status === 'active' ? 'default' : 'secondary'}>
                  {selectedFounder.status}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Join Date</Label>
                <p className="text-sm">{new Date(selectedFounder.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
