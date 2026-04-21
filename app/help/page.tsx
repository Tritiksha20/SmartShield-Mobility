"use client"

import { ArrowLeft, HelpCircle, Book, MessageSquare, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function Help() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="border-gray-800 bg-gray-900/50 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Common questions about your vehicle security system</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the vehicle security system work?</AccordionTrigger>
                    <AccordionContent>
                      SmartShield Mobility uses a combination of hardware sensors, software monitoring, and AI analysis to
                      protect your vehicle. It monitors all electronic systems, detects intrusion attempts, and can
                      automatically respond to security threats. The system continuously analyzes patterns to identify
                      potential vulnerabilities before they can be exploited.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What should I do if I receive a security alert?</AccordionTrigger>
                    <AccordionContent>
                      When you receive a security alert, first check the details to understand the nature of the threat.
                      For minor alerts, you can often acknowledge them after reviewing. For serious threats like
                      unauthorized access attempts, you should enable Safe Mode and contact support. All alerts are
                      logged in the Security Logs section for later review.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How often should I update my security system?</AccordionTrigger>
                    <AccordionContent>
                      We recommend applying security updates as soon as they become available. The system will notify
                      you when updates are ready to install. Regular updates ensure your vehicle has the latest
                      protection against emerging threats. For optimal security, enable automatic updates in your
                      settings.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What is Safe Mode and when should I use it?</AccordionTrigger>
                    <AccordionContent>
                      Safe Mode is a protective state that restricts vehicle functions to prevent potential damage
                      during security incidents. It should be activated when you suspect your vehicle is under attack,
                      when unusual behavior is detected, or when advised by security alerts. In Safe Mode, only
                      essential systems remain operational while all network communications are strictly monitored.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I add new users to my vehicle?</AccordionTrigger>
                    <AccordionContent>
                      To add new users, go to the User & Device Management section and click "Add User." Enter their
                      name, select their role (Owner, Driver, or Guest), and choose whether to enable biometric
                      authentication. Each role has different permission levels, with Owners having full access and
                      Guests having limited functionality.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Book className="mr-2 h-5 w-5 text-blue-500" />
                  User Guides
                </CardTitle>
                <CardDescription>Detailed documentation for your security system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-md">
                    <div className="font-medium mb-2 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-blue-400" />
                      Getting Started Guide
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Learn the basics of your vehicle security system and how to set it up properly.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Guide
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-md">
                    <div className="font-medium mb-2 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-blue-400" />
                      Advanced Security Features
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Detailed explanation of all advanced security features and how to use them.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Guide
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-md">
                    <div className="font-medium mb-2 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-blue-400" />
                      Troubleshooting Guide
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Solutions for common issues and how to diagnose security problems.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Guide
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-md">
                    <div className="font-medium mb-2 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-blue-400" />
                      User & Device Management
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Learn how to manage users, devices, and access permissions.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get help from our security experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-3 rounded-md">
                    <div className="font-medium mb-1">24/7 Emergency Support</div>
                    <div className="text-sm text-gray-400 mb-2">For urgent security issues</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Call Support
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-3 rounded-md">
                    <div className="font-medium mb-1">Email Support</div>
                    <div className="text-sm text-gray-400 mb-2">Response within 24 hours</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Send Email
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-3 rounded-md">
                    <div className="font-medium mb-1">Live Chat</div>
                    <div className="text-sm text-gray-400 mb-2">Available 9am-5pm Mon-Fri</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <ExternalLink className="mr-2 h-5 w-5 text-purple-500" />
                  Additional Resources
                </CardTitle>
                <CardDescription>More ways to learn and get help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-2 hover:bg-gray-800 rounded-md transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2 text-purple-400" />
                    <a href="#" className="text-sm">
                      Security Blog
                    </a>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-800 rounded-md transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2 text-purple-400" />
                    <a href="#" className="text-sm">
                      Video Tutorials
                    </a>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-800 rounded-md transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2 text-purple-400" />
                    <a href="#" className="text-sm">
                      Community Forum
                    </a>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-800 rounded-md transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2 text-purple-400" />
                    <a href="#" className="text-sm">
                      Security Updates
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

