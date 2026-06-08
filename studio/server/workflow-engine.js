class WorkflowEngine {
  plan(flowDef) {
    const { nodes, edges } = flowDef;
    const nodeMap = {};
    for (const n of nodes) nodeMap[n.id] = n;

    const adj = {};
    for (const n of nodes) adj[n.id] = { node: n, dependencies: [], dependents: [] };
    for (const e of edges) {
      adj[e.to].dependencies.push(e.from);
      adj[e.from].dependents.push(e.to);
    }

    const inDegree = {};
    for (const n of nodes) inDegree[n.id] = adj[n.id].dependencies.length;

    const groups = [];
    const remaining = new Set(nodes.map(n => n.id));
    while (remaining.size > 0) {
      const group = [];
      for (const id of remaining) { if (inDegree[id] === 0) group.push(id); }
      if (group.length === 0) throw new Error(`Circular dependency: ${[...remaining].join(', ')}`);
      groups.push(group);
      for (const id of group) {
        remaining.delete(id);
        for (const dep of adj[id].dependents) inDegree[dep]--;
      }
    }
    return { groups, nodeMap, adj };
  }

  flattenPlan(plan) {
    return plan.groups.map((group, idx) => ({
      phase: idx, parallel: group.length > 1,
      nodes: group.map(id => plan.nodeMap[id])
    }));
  }
}

module.exports = WorkflowEngine;
