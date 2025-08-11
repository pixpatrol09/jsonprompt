import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PromptData {
  fidelity_priority: string
  task: string
  input_image: string
  background_description: string
  instructions: {
    preserve_subject: boolean
    preserve_details: boolean
    pose_locked: boolean
    no_face_or_garment_modification: boolean
    scale_and_alignment: string
    integration_style: string
    lighting_match: boolean
    shadow_blending: boolean
    color_grading: string
    output_resolution: string
    logos: string
    product_features: string
  }
  model_lock: {
    preserve_proportions: boolean
    feet_position_locked: boolean
    head_position_locked: boolean
    arms_position_locked: boolean
    legs_position_locked: boolean
    outfit_position_locked: boolean
    no_body_warping: boolean
    no_pose_generation: boolean
    no_scale_distortion: boolean
    camera_perspective_locked: boolean
    preserve_skin_tone: boolean
    preserve_race: boolean
    preserve_face_identity: boolean
    preserve_subject_position: boolean
    preserve_frame_ratio: boolean
  }
  additional_details: {
    visual_style: string
    lighting: string
    integration_priority: string
  }
}

export interface UserTemplate {
  id: string
  name: string
  description: string
  category: 'fashion' | 'product' | 'portrait' | 'lifestyle' | 'commercial' | 'editorial' | 'custom'
  tags: string[]
  data: PromptData
  createdAt: string
  isFavorite: boolean
  usageCount: number
}

export interface TemplateFile {
  _promptStudio: {
    version: string
    exported: string
    signature: string
  }
  data: PromptData
  metadata?: {
    name: string
    description: string
    category: string
    tags: string[]
  }
}

interface PromptState {
  currentStep: number
  promptData: PromptData
  presets: Record<string, PromptData>
  userTemplates: UserTemplate[]
  recentTemplates: string[] // template IDs
  updatePromptData: (data: Partial<PromptData>) => void
  setCurrentStep: (step: number) => void
  resetPrompt: () => void
  savePreset: (name: string, data: PromptData) => void
  loadPreset: (name: string) => void
  exportJSON: () => string
  importJSON: (json: string) => boolean
  saveAsTemplate: (metadata: { name: string; description: string; category: string; tags: string[] }) => void
  deleteTemplate: (id: string) => void
  toggleFavorite: (id: string) => void
  loadTemplate: (template: UserTemplate) => void
  exportTemplate: (template: UserTemplate) => string
  importTemplate: (fileContent: string) => { success: boolean; error?: string }
  validateTemplate: (json: any) => boolean
}

const defaultPromptData: PromptData = {
  fidelity_priority: "",
  task: "background_integration",
  input_image: "",
  background_description: "",
  instructions: {
    preserve_subject: true,
    preserve_details: true,
    pose_locked: true,
    no_face_or_garment_modification: true,
    scale_and_alignment: "match original proportions and placement",
    integration_style: "photorealistic",
    lighting_match: true,
    shadow_blending: true,
    color_grading: "match background",
    output_resolution: "same_as_input",
    logos: "Preserve original logo shape, size, and position",
    product_features: "Preserve garment material, color, fit, silhouette, and texture. No hallucinations or alterations."
  },
  model_lock: {
    preserve_proportions: true,
    feet_position_locked: true,
    head_position_locked: true,
    arms_position_locked: true,
    legs_position_locked: true,
    outfit_position_locked: true,
    no_body_warping: true,
    no_pose_generation: true,
    no_scale_distortion: true,
    camera_perspective_locked: true,
    preserve_skin_tone: true,
    preserve_race: true,
    preserve_face_identity: true,
    preserve_subject_position: true,
    preserve_frame_ratio: true
  },
  additional_details: {
    visual_style: "Editorial, cinematic, with a focus on dynamic athletic posture",
    lighting: "Natural midday with soft shadows blending seamlessly into background, capturing an energetic yet relaxed mood",
    integration_priority: "Scene realism must not override model or product accuracy"
  }
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set, get) => ({
      currentStep: -1,
      promptData: defaultPromptData,
      presets: {},
      userTemplates: [],
      recentTemplates: [],
      
      updatePromptData: (data) => set((state) => ({
        promptData: { ...state.promptData, ...data }
      })),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetPrompt: () => set({ promptData: defaultPromptData, currentStep: -1 }),
      
      savePreset: (name, data) => set((state) => ({
        presets: { ...state.presets, [name]: data }
      })),
      
      loadPreset: (name) => {
        const preset = get().presets[name]
        if (preset) {
          set({ promptData: preset })
        }
      },
      
      exportJSON: () => JSON.stringify(get().promptData, null, 2),
      
      importJSON: (json) => {
        try {
          const data = JSON.parse(json)
          set({ promptData: data })
          return true
        } catch {
          return false
        }
      },

      validateTemplate: (json: any): boolean => {
        try {
          // Size check - prevent large payloads
          const jsonString = JSON.stringify(json)
          if (jsonString.length > 100000) { // 100KB limit
            return false
          }

          // Check signature
          if (json._promptStudio?.signature !== "prompt-studio-template") {
            return false
          }

          // Version check
          if (!json._promptStudio?.version || typeof json._promptStudio.version !== 'string') {
            return false
          }

          // Check data structure with strict validation
          const data = json.data
          if (!data || typeof data !== 'object') {
            return false
          }

          // Validate required string fields
          const requiredStrings = [
            'fidelity_priority', 'task', 'input_image', 'background_description'
          ]
          
          for (const field of requiredStrings) {
            if (typeof data[field] !== 'string' || data[field].length > 5000) {
              return false
            }
          }

          // Validate instructions object
          if (!data.instructions || typeof data.instructions !== 'object') {
            return false
          }

          // Validate model_lock object
          if (!data.model_lock || typeof data.model_lock !== 'object') {
            return false
          }

          // Validate additional_details object
          if (!data.additional_details || typeof data.additional_details !== 'object') {
            return false
          }

          // Check for suspicious content
          const suspiciousPatterns = [
            /<script/i, /javascript:/i, /on\w+=/i, /eval\(/i, /function\(/i
          ]
          
          for (const pattern of suspiciousPatterns) {
            if (pattern.test(jsonString)) {
              return false
            }
          }

          return true
        } catch {
          return false
        }
      },

      saveAsTemplate: (metadata) => {
        const template: UserTemplate = {
          id: `custom-${Date.now()}`,
          name: metadata.name,
          description: metadata.description,
          category: metadata.category as any,
          tags: metadata.tags,
          data: get().promptData,
          createdAt: new Date().toISOString(),
          isFavorite: false,
          usageCount: 0
        }

        set((state) => ({
          userTemplates: [...state.userTemplates, template]
        }))
      },

      deleteTemplate: (id) => {
        set((state) => ({
          userTemplates: state.userTemplates.filter(t => t.id !== id),
          recentTemplates: state.recentTemplates.filter(tid => tid !== id)
        }))
      },

      toggleFavorite: (id) => {
        set((state) => ({
          userTemplates: state.userTemplates.map(t => 
            t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
          )
        }))
      },

      loadTemplate: (template) => {
        set((state) => ({
          promptData: template.data,
          userTemplates: state.userTemplates.map(t => 
            t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
          ),
          recentTemplates: [
            template.id,
            ...state.recentTemplates.filter(id => id !== template.id)
          ].slice(0, 5)
        }))
      },

      exportTemplate: (template) => {
        const templateFile: TemplateFile = {
          _promptStudio: {
            version: "1.0",
            exported: new Date().toISOString(),
            signature: "prompt-studio-template"
          },
          data: template.data,
          metadata: {
            name: template.name,
            description: template.description,
            category: template.category,
            tags: template.tags
          }
        }
        return JSON.stringify(templateFile, null, 2)
      },

      importTemplate: (fileContent) => {
        try {
          const json = JSON.parse(fileContent)
          
          if (!get().validateTemplate(json)) {
            return { 
              success: false, 
              error: "Invalid template file. Please use files exported from Prompt Studio." 
            }
          }

          const template: UserTemplate = {
            id: `imported-${Date.now()}`,
            name: json.metadata?.name || 'Imported Template',
            description: json.metadata?.description || 'Imported from file',
            category: json.metadata?.category || 'custom',
            tags: json.metadata?.tags || [],
            data: json.data,
            createdAt: new Date().toISOString(),
            isFavorite: false,
            usageCount: 0
          }

          set((state) => ({
            userTemplates: [...state.userTemplates, template]
          }))

          return { success: true }
        } catch {
          return { 
            success: false, 
            error: "Invalid JSON file. Please check the file format." 
          }
        }
      }
    }),
    {
      name: 'prompt-storage',
    }
  )
)
