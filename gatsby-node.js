'use strict'

const crypto = require('crypto')
const ps = require('./src/pluralsight')

const defaultOptions = {
  username: ''
}

exports.sourceNodes = async ({ actions, createNodeId }, pluginOptions) => {
  const { createNode } = actions
  const options = { ...defaultOptions, ...pluginOptions }

  function createNodeData (item) {
    const nodeId = createNodeId(`pluralsight-${item.type}-${item.code}`)
    const nodeContent = JSON.stringify(item)
    const nodeContentDigest = crypto.createHash('md5').update(nodeContent).digest('hex')
    const typeInternal = 'Pluralsight' + item.type.charAt(0).toUpperCase() + item.type.substr(1).toLowerCase()
    const nodeDataInternal = { type: typeInternal, content: nodeContent, contentDigest: nodeContentDigest }
    const nodeData = Object.assign({}, item, { id: nodeId, parent: null, children: [], internal: nodeDataInternal })
    return nodeData
  }

  const userHandle = await ps.getUserHandle(options.username)
  let nodes = []

  // skills
  const skills = await ps.getProfileSkills(userHandle)
  skills.map(item => { return Object.assign({}, item, { code: item.id, type: 'skill' }) }).forEach(item => nodes.push(createNodeData(item)))

  // completed courses
  const courses = await ps.getProfileCompletedCourses(userHandle)
  courses.map(item => { return Object.assign({}, item, { code: item.courseId, type: 'course' }) }).forEach(item => nodes.push(createNodeData(item)))

  // add the nodes
  nodes.forEach(node => createNode(node))
}
