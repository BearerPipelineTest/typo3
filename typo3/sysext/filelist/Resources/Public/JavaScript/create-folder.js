/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
import DocumentService from"@typo3/core/document-service.js";import Modal from"@typo3/backend/modal.js";import RegularEvent from"@typo3/core/event/regular-event.js";class CreateFolder{constructor(){this.changed=!1,DocumentService.ready().then((()=>{const e=document.querySelector(".filelist-create-folder-main");if(!(e instanceof HTMLElement))throw new Error("Main element not found");this.selfUrl=e.dataset.selfUrl,this.confirmTitle=e.dataset.confirmTitle,this.confirmText=e.dataset.confirmText,this.registerEvents()}))}reload(e){const t=this.selfUrl.replace(/AMOUNT/,e.toString());if(this.changed){const e=Modal.confirm(this.confirmTitle,this.confirmText);e.on("confirm.button.cancel",(()=>{e.trigger("modal-dismiss")})),e.on("confirm.button.ok",(()=>{e.trigger("modal-dismiss"),window.location.href=t}))}else window.location.href=t}registerEvents(){new RegularEvent("change",(()=>{this.changed=!0})).delegateTo(document,['input[type="text"][name^="data[newfolder]"]','input[type="text"][name^="data[newfile]"]','input[type="text"][name^="data[newMedia]"]'].join(",")),new RegularEvent("change",(e=>{const t=parseInt(e.target.value,10);this.reload(t)})).bindTo(document.getElementById("number-of-new-folders"))}}export default new CreateFolder;