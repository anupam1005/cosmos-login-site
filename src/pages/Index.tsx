import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/components/auth/AuthProvider';
import { ShieldCheck, TrendingUp, Search, FileText, CheckCircle2, ArrowRight, Star, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const { user } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                Trusted by 500+ Financial Institutions
              </span>
            </motion.div>
            <motion.h1 
              className="text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Modern Financial <span className="text-primary italic">Recovery</span> Solutions
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              A complete, secure, and ethical platform designed to streamline debt recovery operations 
              while maintaining transparency and regulatory compliance.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {!user ? (
                <>
                  <Link to="/register">
                    <Button size="xl" className="px-8 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                      Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="xl" variant="outline" className="px-8 h-14 text-lg bg-white/50 backdrop-blur-sm border-slate-200">
                      View Live Demo
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/admin">
                  <Button size="xl" className="px-8 h-14 text-lg">
                    Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-24 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Recovered', value: '$2.4B+', icon: TrendingUp },
            { label: 'Active Agents', value: '1,200+', icon: Users },
            { label: 'Compliance Rate', value: '100%', icon: ShieldCheck }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-4 rounded-xl">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section className="container mx-auto px-4 py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Recovery Ecosystem</h2>
          <p className="text-lg text-slate-600">Everything you need to manage the complete debt recovery lifecycle in one place.</p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { title: 'Digital Collections', desc: 'Automated omnichannel outreach across SMS, email, and interactive voice.', icon: TrendingUp },
            { title: 'Skip Tracing', desc: 'Advanced search capabilities to locate unreachable debtors using public data.', icon: Search },
            { title: 'Legal Workflow', desc: 'End-to-end management of legal proceedings and court documentation.', icon: ShieldCheck },
            { title: 'Real-time MIS', desc: 'Granular reporting and performance analytics for recovery managers.', icon: FileText }
          ].map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full border-0 shadow-none bg-transparent hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 p-6">
                <CardHeader className="p-0 mb-6">
                  <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8">Unmatched Security and Compliance</h2>
              <ul className="space-y-6">
                {[
                  'SOC2 Type II Certified Data Centers',
                  'FDCPA & TCPA Compliant Workflows',
                  'Real-time Audit Logs & Call Recordings',
                  'Bank-grade AES-256 Encryption'
                ].map((text, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <span className="text-lg text-slate-300">{text}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-12 bg-white text-slate-900 hover:bg-slate-100 px-8 h-12 text-lg font-bold">
                Learn More About Security
              </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 h-40 flex flex-col justify-end">
                  <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">Uptime SLA</div>
                </div>
                <div className="bg-primary/20 p-6 rounded-2xl border border-primary/30 h-60 flex flex-col justify-end">
                  <div className="text-3xl font-bold text-white mb-2">ISO 27001</div>
                  <div className="text-slate-200 text-sm uppercase tracking-wider font-bold">Certified Platform</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 h-60 flex flex-col justify-end">
                  <div className="text-3xl font-bold text-white mb-2">50M+</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">Cases Managed</div>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 h-40 flex flex-col justify-end">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">Global Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto bg-primary rounded-3xl p-12 lg:p-20 shadow-2xl shadow-primary/40 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Recovery Operations?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Join the leading financial institutions using SafeRecovery to improve their recovery rates by up to 35%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="xl" variant="secondary" className="px-8 h-14 text-lg font-bold">
                Create Free Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="xl" variant="outline" className="px-8 h-14 text-lg border-white/30 text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-slate-900 tracking-tight">SafeRecovery</span>
            </div>
            <div className="flex space-x-8 text-slate-500 font-medium">
              <Link to="/blog" className="hover:text-primary transition-colors">Insights</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Terms</Link>
            </div>
            <div className="text-slate-400 text-sm">
              © 2026 SafeRecovery Demo. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

