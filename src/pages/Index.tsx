import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/components/auth/AuthProvider';
import { ShieldCheck, TrendingUp, Search, FileText } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">SafeRecovery Demo</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive demonstration of a modern financial recovery and debt collection platform. 
            Experience our professional services and secure management systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/register">
                  <Button size="lg" className="min-w-[120px]">
                    Explore Demo
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="min-w-[120px]">
                    Client Login
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/admin">
                <Button size="lg" className="min-w-[120px]">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Recovery Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Financial Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Efficient recovery of outstanding dues using professional 
                  and ethical collection methods.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Search className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Field Investigation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  On-ground verification and skip tracing services to locate 
                  and engage with debtors.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Legal Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Strict adherence to regulatory guidelines and ethical 
                  practices in every interaction.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>MIS Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Real-time tracking and detailed reporting of all recovery 
                  activities and performance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional Debt Management
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of clients who trust our secure and efficient recovery process. 
              This is a demonstration environment.
            </p>
            {!user ? (
              <Link to="/register">
                <Button size="lg">
                  Get Started Today
                </Button>
              </Link>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-foreground">Active Demo Session</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/blog">
                    <Button size="lg" variant="outline">
                      View Cases
                    </Button>
                  </Link>
                  <Link to="/admin">
                    <Button size="lg">
                      Admin Panel
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

