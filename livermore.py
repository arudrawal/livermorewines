import os
import webapp2
import jinja2
import hashlib
import hmac
import random
import re
import string
#from jinja2 import filters, environment

#Only one html file in root directory
template_dir = os.path.join(os.path.dirname(__file__))
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = True)

class MainPage(webapp2.RequestHandler):
  def get(self):
    #path = os.path.join (os.path.dirname (__file__), q)
    self.response.headers ['Content-Type'] = 'text/html'
    #self.response.out.write('Hello, Livermore Wines!')
    #self.response.out.write (template.render (path, {}))
    t = jinja_env.get_template('index.html')
    self.response.out.write(t.render())
    

app = webapp2.WSGIApplication([
       ('/', MainPage),
       ],
      debug=True)
