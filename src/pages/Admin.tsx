import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { 
  FileText, 
  Mail, 
  Users, 
  Eye,
  MessageCircle,
  Calendar,
  CheckCircle,
  XCircle 
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch contact messages
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch blog posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          status,
          created_at,
          profiles!blog_posts_author_id_fkey (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      setContactMessages(messages || []);
      setBlogPosts((posts as any) || []);
    } catch (error) {
      toast({
        title: 'Error loading data',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setContactMessages(prev =>
        prev.map(msg => msg.id === id ? { ...msg, status } : msg)
      );

      toast({
        title: 'Status updated',
        description: `Message marked as ${status}`,
      });
    } catch (error) {
      toast({
        title: 'Error updating status',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website content and messages</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contactMessages.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {contactMessages.filter(m => m.status === 'unread').length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{blogPosts.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {blogPosts.filter(p => p.status === 'published').length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>Manage incoming contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div>Loading messages...</div>
                  ) : contactMessages.length === 0 ? (
                    <p className="text-muted-foreground">No messages yet</p>
                  ) : (
                    <div className="space-y-4">
                      {contactMessages.map((message) => (
                        <Card key={message.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{message.subject}</CardTitle>
                                <CardDescription>
                                  From: {message.name} ({message.email})
                                </CardDescription>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={message.status === 'unread' ? 'destructive' : 'default'}
                                >
                                  {message.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(message.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm mb-4">{message.message}</p>
                            <div className="flex gap-2">
                              {message.status === 'unread' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateMessageStatus(message.id, 'read')}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark as Read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateMessageStatus(message.id, 'replied')}
                              >
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Mark as Replied
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage your blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div>Loading posts...</div>
                  ) : blogPosts.length === 0 ? (
                    <p className="text-muted-foreground">No blog posts yet</p>
                  ) : (
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <Card key={post.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{post.title}</CardTitle>
                                <CardDescription>
                                  By: {post.profiles?.full_name || 'Unknown'}
                                </CardDescription>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={post.status === 'published' ? 'default' : 'secondary'}
                                >
                                  {post.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(post.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;